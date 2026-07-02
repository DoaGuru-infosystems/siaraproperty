const { db } = require("../db");
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

// Add Blog
const addBlog = (req, res) => {
    try {
        const { title, description, category, author } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ success: false, error: 'Title and description are required' });
        }

        // 1. SECURE & CLEAN SLUG GENERATION
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // 2. DYNAMIC UPLOADS STRUCTURE (Store ONLY filename in DB)
        const image = req.file ? req.file.filename : null;

        const insertQuery = `
            INSERT INTO blogs (title, slug, description, image, author, category)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            title, 
            slug, 
            description, // 3. RICH TEXT (HTML) RENDERING COMPATIBILITY (Saved as LONGTEXT string)
            image, 
            author || 'Siara Properties', 
            category || 'Real Estate'
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

module.exports = {
    addBlog,
    getAllBlogs,
    getBlogBySlug,
    deleteBlog
};
