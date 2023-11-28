import express from 'express';
import { DataBase } from '../Utils/Database';

const router = express.Router();

router.post('/add-new-task', async (req, res) => {
    try {
        const { topic, description, dateline, assignee, tags } = req.body;

        if (!topic || !description || !dateline || !assignee || !tags) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTask = {
            id: Math.floor(Math.random() * 999),
            topic,
            description,
            dateline,
            assignee,
            tags
        };

        await DataBase.InsertData({
            db: "taskfy",
            collection: "tasks",
            data: newTask
        });

        return res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
