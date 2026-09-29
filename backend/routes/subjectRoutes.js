const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all subjects for logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM subjects
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [req.userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch subjects"
        });
    }
});
// Create a new subject
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Subject name is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO subjects (user_id, name)
             VALUES ($1, $2)
             RETURNING *`,
            [req.userId, name.trim()]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create subject"
        });
    }
});
// Delete a subject
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM subjects
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [req.params.id, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Subject not found"
            });
        }

        res.json({
            message: "Subject deleted successfully",
            subject: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete subject"
        });
    }
});
module.exports = router;