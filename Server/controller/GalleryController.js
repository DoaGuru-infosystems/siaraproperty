const { db } = require("../db");
const fs = require("fs");
const path = require("path");

const galleryUploadsDir = path.join(__dirname, "..", "uploads", "gallery");

const getImageUrl = (imagePath) => {
    const backendBaseUrl = process.env.BACKEND_BASE_URL?.replace(/\/+$/, "");
    if (!backendBaseUrl) {
        throw new Error("BACKEND_BASE_URL must be configured to serve gallery images");
    }

    const encodedPath = imagePath
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");
    return `${backendBaseUrl}/uploads/${encodedPath}`;
};

const removeUploadedFile = (file) => {
    if (!file?.path) return;

    fs.unlink(file.path, (error) => {
        if (error && error.code !== "ENOENT") {
            console.error("Error removing unused gallery upload:", error);
        }
    });
};

const removeGalleryFile = (imagePath, callback) => {
    const imageFilePath = path.join(galleryUploadsDir, path.basename(imagePath));
    fs.unlink(imageFilePath, (error) => {
        if (error && error.code !== "ENOENT") {
            return callback(error);
        }
        callback(null);
    });
};

const serializeGalleryImage = (image) => ({
    ...image,
    image_url: getImageUrl(image.image_path),
});

const getGalleryImages = (req, res) => {
    const query = `
        SELECT id, name, image_path, created_at, updated_at
        FROM gallery_images
        ORDER BY created_at DESC, id DESC
    `;

    db.query(query, (error, images) => {
        if (error) {
            console.error("Error fetching gallery images:", error);
            return res.status(500).json({ success: false, error: "Failed to fetch gallery images" });
        }

        try {
            res.status(200).json({
                success: true,
                data: images.map(serializeGalleryImage),
            });
        } catch (serializationError) {
            console.error("Error preparing gallery image URLs:", serializationError);
            res.status(500).json({ success: false, error: serializationError.message });
        }
    });
};

const addGalleryImage = (req, res) => {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    if (!name || name.length > 255) {
        removeUploadedFile(req.file);
        return res.status(400).json({ success: false, error: "Image name is required and must be 255 characters or fewer" });
    }
    if (!req.file) {
        return res.status(400).json({ success: false, error: "An image file is required" });
    }

    const imagePath = `gallery/${path.basename(req.file.filename)}`;
    const query = "INSERT INTO gallery_images (name, image_path) VALUES (?, ?)";

    db.query(query, [name, imagePath], (error, result) => {
        if (error) {
            console.error("Error saving gallery image:", error);
            removeUploadedFile(req.file);
            return res.status(500).json({ success: false, error: "Failed to save gallery image" });
        }

        try {
            const image = serializeGalleryImage({
                id: result.insertId,
                name,
                image_path: imagePath,
            });
            res.status(201).json({ success: true, data: image });
        } catch (serializationError) {
            console.error("Error preparing new gallery image URL:", serializationError);
            res.status(500).json({ success: false, error: serializationError.message });
        }
    });
};

const updateGalleryImage = (req, res) => {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    if (!name || name.length > 255) {
        removeUploadedFile(req.file);
        return res.status(400).json({ success: false, error: "Image name is required and must be 255 characters or fewer" });
    }

    db.query(
        "SELECT image_path FROM gallery_images WHERE id = ?",
        [req.params.id],
        (selectError, images) => {
            if (selectError) {
                console.error("Error finding gallery image:", selectError);
                removeUploadedFile(req.file);
                return res.status(500).json({ success: false, error: "Failed to find gallery image" });
            }
            if (images.length === 0) {
                removeUploadedFile(req.file);
                return res.status(404).json({ success: false, error: "Gallery image not found" });
            }

            const oldImagePath = images[0].image_path;
            const newImagePath = req.file
                ? `gallery/${path.basename(req.file.filename)}`
                : oldImagePath;
            const query = `
                UPDATE gallery_images
                SET name = ?, image_path = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `;

            db.query(query, [name, newImagePath, req.params.id], (updateError) => {
                if (updateError) {
                    console.error("Error updating gallery image:", updateError);
                    removeUploadedFile(req.file);
                    return res.status(500).json({ success: false, error: "Failed to update gallery image" });
                }

                const respondWithUpdatedImage = () => {
                    try {
                        res.status(200).json({
                            success: true,
                            data: serializeGalleryImage({
                                id: Number(req.params.id),
                                name,
                                image_path: newImagePath,
                            }),
                        });
                    } catch (serializationError) {
                        console.error("Error preparing updated gallery image URL:", serializationError);
                        res.status(500).json({ success: false, error: serializationError.message });
                    }
                };

                if (!req.file || oldImagePath === newImagePath) {
                    return respondWithUpdatedImage();
                }

                removeGalleryFile(oldImagePath, (removeError) => {
                    if (removeError) {
                        console.error("Gallery updated but old image could not be removed:", removeError);
                        return res.status(500).json({
                            success: false,
                            error: "Gallery updated, but the previous image file could not be removed",
                        });
                    }
                    respondWithUpdatedImage();
                });
            });
        },
    );
};

const deleteGalleryImage = (req, res) => {
    db.query(
        "SELECT image_path FROM gallery_images WHERE id = ?",
        [req.params.id],
        (selectError, images) => {
            if (selectError) {
                console.error("Error finding gallery image for deletion:", selectError);
                return res.status(500).json({ success: false, error: "Failed to find gallery image" });
            }
            if (images.length === 0) {
                return res.status(404).json({ success: false, error: "Gallery image not found" });
            }

            db.query(
                "DELETE FROM gallery_images WHERE id = ?",
                [req.params.id],
                (deleteError) => {
                    if (deleteError) {
                        console.error("Error deleting gallery image:", deleteError);
                        return res.status(500).json({ success: false, error: "Failed to delete gallery image" });
                    }

                    removeGalleryFile(images[0].image_path, (removeError) => {
                        if (removeError) {
                            console.error("Gallery record deleted but image file could not be removed:", removeError);
                            return res.status(500).json({
                                success: false,
                                error: "Gallery record was deleted, but the image file could not be removed",
                            });
                        }
                        res.status(200).json({ success: true, message: "Gallery image deleted successfully" });
                    });
                },
            );
        },
    );
};

module.exports = {
    addGalleryImage,
    getGalleryImages,
    updateGalleryImage,
    deleteGalleryImage,
};
