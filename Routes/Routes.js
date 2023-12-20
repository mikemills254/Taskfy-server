import express from 'express';
import { Task_Schema, Sprint_Schema, Subtask_Schema  } from '../Model/model.js';
import Controller from '../Controller/controller.js';

const router = express.Router();

router.post('/add-new-task', async (req, res) => {
    const { task_name, task_descript, task_dateline, task_team, task_tags } = req.body;
    try {
        const newTask = new Task_Schema({
            name: task_name,
            description: task_descript,
            dateLine: task_dateline,
            team: task_team,
            tags: task_tags
        })

        const results = await Controller.insertData('Taskfy', "tasks", newTask);
        return res.status(201).json({
            message: results.message,
            data: results.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.get('/get-all-task', async (req, res) => {
    try {
        const tasks = await Controller.getAllData("Taskfy", "tasks");
        return res.status(200).json({
            message: tasks.message,
            data: tasks.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.post('/add-new-sprint', async (req, res) => {
    const { sprint_name, sprint_description, sprint_starttime, sprint_endtime, sprint_team } = req.body;
    try {
        const newSprint = new Sprint_Schema({
            name: sprint_name,
            description: sprint_description,
            startTime: sprint_starttime,
            endTime: sprint_endtime,
            team: sprint_team
        })

        const results = await Controller.insertData('Taskfy', "sprints", newSprint);
        return res.status(201).json({
            message: results.message,
            data: results.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.get('/get-all-sprints', async (req, res) => {
    try {
        const results = await Controller.getAllData("Taskfy", "sprints");
        return res.status(200).json({
            message: results.message,
            data: results.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.post('/delete-task/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const results = await Controller.deleteData('Taskfy', 'tasks', id);
        if (results) {
            return res.status(204).json({
                message: results.response,
                err: results.err
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});
export default router;
