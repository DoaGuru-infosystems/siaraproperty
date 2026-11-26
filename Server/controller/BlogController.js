const { db } = require("../db");
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const extractExcerpt = (htmlContent, length = 160) => {
    if (!htmlContent || typeof htmlContent !== 'string') return '';
    const clean = htmlContent
        .replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
        .replace(/<style[^>]*>([\S\s]*?)<\/style>/gmi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
    return clean.length > length ? clean.substring(0, length) + '...' : clean;
};

const parseSeoMetadata = (body = {}, defaultDescription = '') => {
    const value = body.meta_description;
    if (value !== undefined && value !== null && typeof value !== 'string') {
        return { error: 'Meta description must be text' };
    }

    let metaDescription = typeof value === 'string' ? value.trim() : '';
    // If empty, extract excerpt from main content description
    if (!metaDescription && defaultDescription) {
        metaDescription = extractExcerpt(defaultDescription, 160);
    }

    if (metaDescription.length > 320) {
        return { error: 'Meta description must be 320 characters or fewer' };
    }

    return { metadata: { meta_description: metaDescription || null } };
};

const generateBlogSlug = (title) =>
    (title || '').toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const generateBlogCanonicalUrl = (slug) => {
    const clientUrl = (process.env.CLIENT_URL || 'https://siaraproperties.com').trim();
    let baseUrl;
    try {
        baseUrl = new URL(clientUrl);
    } catch (error) {
        baseUrl = new URL('https://siaraproperties.com');
    }
    return new URL(`/blog/${slug}`, baseUrl.origin).toString();
};

// Add Blog
const addBlog = (req, res) => {
    try {
        const { title, description, category, author, meta_title, slug, canonical_url, image_alt } = req.body;
        
        const normalizedTitle = typeof title === 'string' ? title.trim() : '';
        if (!normalizedTitle || typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({ success: false, error: 'Title and description are required' });
        }
        if (normalizedTitle.length > 255) {
            return res.status(400).json({ success: false, error: 'Title must be 255 characters or fewer' });
        }

        const seoResult = parseSeoMetadata(req.body, description);
        if (seoResult.error) {
            return res.status(400).json({ success: false, error: seoResult.error });
        }

        const normalizedMetaTitle = typeof meta_title === 'string' && meta_title.trim()
            ? meta_title.trim().slice(0, 255)
            : normalizedTitle;

        const customSlug = typeof slug === 'string' && slug.trim() ? generateBlogSlug(slug.trim()) : '';
        const finalSlug = customSlug || generateBlogSlug(normalizedMetaTitle) || generateBlogSlug(normalizedTitle);
        if (!finalSlug) {
            return res.status(400).json({ success: false, error: 'Title must contain letters or numbers to generate a blog URL' });
        }

        let finalCanonicalUrl = '';
        if (typeof canonical_url === 'string' && canonical_url.trim()) {
            finalCanonicalUrl = canonical_url.trim().slice(0, 2048);
        } else {
            finalCanonicalUrl = generateBlogCanonicalUrl(finalSlug);
        }
        
        // 2. DYNAMIC UPLOADS STRUCTURE (Store ONLY filename in DB)
        const image = req.file ? req.file.filename : null;

        const insertQuery = `
            INSERT INTO blogs (
                title, slug, description, image, img_alt, author, category,
                canonical_url, meta_title, meta_description
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            normalizedTitle,
            finalSlug, 
            description, // 3. RICH TEXT (HTML) RENDERING COMPATIBILITY (Saved as LONGTEXT string)
            image, 
            image_alt ? image_alt.trim().slice(0, 255) : null,
            author || 'Siara Properties', 
            category || 'Real Estate',
            finalCanonicalUrl,
            normalizedMetaTitle,
            seoResult.metadata.meta_description
        ];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting blog:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ success: false, error: 'A blog with this title/slug already exists' });
                }
                return res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
            }

            res.status(201).json({ success: true, message: 'Blog added successfully', blogId: result.insertId });
        });
    } catch (error) {
        console.error('Add Blog Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

// Get All Blogs
const getAllBlogs = (req, res) => {
    try {
        const sql = 'SELECT * FROM blogs ORDER BY created_at DESC';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching blogs:', err);
                return res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
            }

            // 2. DYNAMIC UPLOADS STRUCTURE & IMAGE URLS (Construct URLs dynamically)
            const updatedResults = results.map(row => ({
                ...row,
                short_description: extractExcerpt(row.description, 160),
                image_alt: row.img_alt || row.title,
                image: row.image ? `${process.env.BACKEND_BASE_URL}/uploads/blog/${row.image}` : null
            }));

            res.status(200).json({ success: true, data: updatedResults, message: 'Blogs fetched successfully' });
        });
    } catch (error) {
        console.error('Get All Blogs Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

// Get Single Blog by Slug
const getBlogBySlug = (req, res) => {
    try {
        const slug = req.params.slug;
        const sqlSelect = 'SELECT * FROM blogs WHERE slug = ?';
        const sqlUpdateViews = 'UPDATE blogs SET views = views + 1 WHERE slug = ?';

        db.query(sqlSelect, [slug], (err, results) => {
            if (err) {
                console.error('Error fetching blog:', err);
                return res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
            }

            if (results.length > 0) {
                // Update views asynchronously
                db.query(sqlUpdateViews, [slug], (updateErr) => {
                    if (updateErr) console.error('Error updating blog views:', updateErr);
                });

                const blog = results[0];
                if (!blog.canonical_url && blog.slug) {
                    blog.canonical_url = generateBlogCanonicalUrl(blog.slug);
                }
                if (!blog.meta_title) {
                    blog.meta_title = blog.title;
                }
                blog.image_alt = blog.img_alt || blog.title;
                blog.short_description = extractExcerpt(blog.description, 160);
                // 2. DYNAMIC UPLOADS STRUCTURE & IMAGE URLS
                blog.image = blog.image ? `${process.env.BACKEND_BASE_URL}/uploads/blog/${blog.image}` : null;

                res.status(200).json({ success: true, data: blog, message: 'Blog fetched successfully' });
            } else {
                res.status(404).json({ success: false, error: 'Blog not found', message: 'Blog not found' });
            }
        });
    } catch (error) {
        console.error('Get Blog Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

// Delete Blog
const deleteBlog = (req, res) => {
    try {
        const blogId = req.params.id;
        
        const selectSql = 'SELECT image FROM blogs WHERE id = ?';
        db.query(selectSql, [blogId], (selectErr, selectResults) => {
            if (selectErr) {
                console.error('Error finding blog for deletion:', selectErr);
                return res.status(500).json({ success: false, error: 'Internal Server Error', message: selectErr.message });
            }

            if (selectResults.length === 0) {
                return res.status(404).json({ success: false, error: 'Blog not found' });
            }

            const imageFileName = selectResults[0].image;

            const deleteSql = 'DELETE FROM blogs WHERE id = ?';
            db.query(deleteSql, [blogId], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting blog:', deleteErr);
                    return res.status(500).json({ success: false, error: 'Internal Server Error', message: deleteErr.message });
                }

                // 4. DEFENSIVE FILE DELETION LOGIC (`deleteBlog`)
                if (imageFileName) {
                    const filePath = path.join(__dirname, '..', 'uploads', 'blog', imageFileName);
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath);
                        } catch (unlinkErr) {
                            console.error("Error unlinking blog image file:", unlinkErr);
                        }
                    }
                }

                res.status(200).json({ success: true, message: 'Blog and its image deleted successfully' });
            });
        });
    } catch (error) {
        console.error('Delete Blog Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

// Get Blog by ID (for Edit form)
const getBlogById = (req, res) => {
    try {
        const id = req.params.id;
        const sqlSelect = 'SELECT * FROM blogs WHERE id = ?';

        db.query(sqlSelect, [id], (err, results) => {
            if (err) {
                console.error('Error fetching blog:', err);
                return res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
            }

            if (results.length > 0) {
                const blog = results[0];
                if (!blog.canonical_url && blog.slug) {
                    blog.canonical_url = generateBlogCanonicalUrl(blog.slug);
                }
                if (!blog.meta_title) {
                    blog.meta_title = blog.title;
                }
                blog.image_alt = blog.img_alt || blog.title;
                blog.short_description = extractExcerpt(blog.description, 160);
                blog.image = blog.image ? `${process.env.BACKEND_BASE_URL}/uploads/blog/${blog.image}` : null;
                res.status(200).json({ success: true, data: blog, message: 'Blog fetched successfully' });
            } else {
                res.status(404).json({ success: false, error: 'Blog not found', message: 'Blog not found' });
            }
        });
    } catch (error) {
        console.error('Get Blog Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

// Edit Blog
const editBlog = (req, res) => {
    try {
        const blogId = req.params.id;
        const { title, description, category, author, meta_title, slug, canonical_url, image_alt } = req.body;
        const normalizedTitle = typeof title === 'string' ? title.trim() : '';

        if (!normalizedTitle || typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({ success: false, error: 'Title and description are required' });
        }
        if (normalizedTitle.length > 255) {
            return res.status(400).json({ success: false, error: 'Title must be 255 characters or fewer' });
        }

        const seoResult = parseSeoMetadata(req.body, description);
        if (seoResult.error) {
            return res.status(400).json({ success: false, error: seoResult.error });
        }

        const normalizedMetaTitle = typeof meta_title === 'string' && meta_title.trim()
            ? meta_title.trim().slice(0, 255)
            : normalizedTitle;

        const customSlug = typeof slug === 'string' && slug.trim() ? generateBlogSlug(slug.trim()) : '';
        const finalSlug = customSlug || generateBlogSlug(normalizedMetaTitle) || generateBlogSlug(normalizedTitle);
        if (!finalSlug) {
            return res.status(400).json({ success: false, error: 'Title must contain letters or numbers to generate a blog URL' });
        }

        let finalCanonicalUrl = '';
        if (typeof canonical_url === 'string' && canonical_url.trim()) {
            finalCanonicalUrl = canonical_url.trim().slice(0, 2048);
        } else {
            finalCanonicalUrl = generateBlogCanonicalUrl(finalSlug);
        }

        const newImage = req.file ? req.file.filename : null;

        let updateQuery = `
            UPDATE blogs 
            SET title = ?, slug = ?, description = ?, author = ?, category = ?,
                canonical_url = ?, meta_title = ?, meta_description = ?, img_alt = ?
        `;
        let values = [
            normalizedTitle,
            finalSlug,
            description,
            author || 'Siara Properties',
            category || 'Real Estate',
            finalCanonicalUrl,
            normalizedMetaTitle,
            seoResult.metadata.meta_description,
            image_alt ? image_alt.trim().slice(0, 255) : null
        ];

        if (newImage) {
            updateQuery += `, image = ?`;
            values.push(newImage);
            
            // Delete old image
            db.query('SELECT image FROM blogs WHERE id = ?', [blogId], (err, results) => {
                if (!err && results.length > 0 && results[0].image) {
                    const filePath = path.join(__dirname, '..', 'uploads', 'blog', results[0].image);
                    if (fs.existsSync(filePath)) {
                        try { fs.unlinkSync(filePath); } catch (e) { console.error("Error unlinking old image:", e); }
                    }
                }
            });
        }

        updateQuery += ` WHERE id = ?`;
        values.push(blogId);

        db.query(updateQuery, values, (err, result) => {
            if (err) {
                console.error('Error updating blog:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ success: false, error: 'A blog with this title/slug already exists' });
                }
                return res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
            }

            if (result.affectedRows === 0) {
                 return res.status(404).json({ success: false, error: 'Blog not found' });
            }

            res.status(200).json({ success: true, message: 'Blog updated successfully' });
        });
    } catch (error) {
        console.error('Edit Blog Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

// Upload Image (for React-Quill)
const uploadBlogImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }
        const imageUrl = `${process.env.BACKEND_BASE_URL}/uploads/blog/${req.file.filename}`;
        res.status(200).json({ success: true, url: imageUrl });
    } catch (error) {
        console.error('Upload Image Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', message: error.message });
    }
};

module.exports = {
    addBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    editBlog,
    deleteBlog,
    uploadBlogImage
};



