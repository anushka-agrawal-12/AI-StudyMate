const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM tasks
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [req.userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
});
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            title,
            description,
            due_date,
            priority,
            subject_id
        } = req.body;

        const result = await pool.query(
            `INSERT INTO tasks
            (user_id, subject_id, title, description, due_date, priority)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                req.userId,
                subject_id || null,
                title,
                description || null,
                due_date || null,
                priority || "medium"
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task"
        });
    }
});
router.patch("/:id/status", authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const result = await pool.query(
            `UPDATE tasks
             SET status = $1
             WHERE id = $2
             AND user_id = $3
             RETURNING *`,
            [status, req.params.id, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task status"
        });
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM tasks
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [req.params.id, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});
module.exports = router;