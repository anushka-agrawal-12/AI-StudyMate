const express = require("express");
const cors = require("cors");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/subjects", subjectRoutes);
app.get("/", (req, res) => {
    res.send("AI StudyMate Backend is running!");
});
const authMiddleware = require("./middleware/authMiddleware");

app.get("/protected-test", authMiddleware, (req, res) => {
    res.json({
        message: "You are authorized!",
        userId: req.userId
    });
});

app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected successfully!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});