import express from 'express';
import { Task_Schema, Sprint_Schema, Subtask_Schema  } from '../Model/model.js';
import { 
    resetPassword, 
    insertData, 
    signInEmailAndPassword, 
    getAllData, 
    loginEmailAndPassword, 
    deleteData, 
    subTask, } from '../Controller/controller.js';
import { validateInput, validateEmail} from '../Middeware/middleware.js'

const router = express.Router();

router.post('/signWithEmailAndPassword', validateInput, async (req, res) => {
    const { email, password } = req.body
    try {
        const results = await signInEmailAndPassword(email, password)
        return res.status(201).json({
            message: results.message,
            token: results.data
        })
    } catch (error) {
        return {
            statusCode: error.code,
            message: error.message
        }
    }
})

router.post('/signInWithEmailandPassword', validateInput, async (req, res) => {
    const { email, password } = req.body
    try {
        const results = await loginEmailAndPassword(email, password)
        return res.status(201).json({
            message: results.message,
            token: results.data
        })
    } catch (error) {
        return {
            statusCode: error.code,
            message: error.message
        }
    }
})

router.post('/password-reset',validateInput, validateEmail, async (req, res) => {
    const email = req.body
    try {
        const results = await resetPassword(email)
        return res.status(201).json({
            message: results.message,
            token: results.data
        })            
    } catch (error) {
        return {
            statusCode: error.code,
            message: error.message
        }
    }
})

router.post('/add-new-task', validateInput, async (req, res) => {
    const { task_name, task_descript, task_dateline, task_team, task_tags } = req.body;
    try {
        const newTask = new Task_Schema({
            name: task_name,
            description: task_descript,
            dateLine: task_dateline,
            team: task_team,
            tags: task_tags
        })

        const results = await insertData('Taskfy', "tasks", newTask);
        return res.status(201).json({
            message: results.message,
            token: results.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.get('/get-all-task', validateInput, async (req, res) => {
    try {
        const tasks = await getAllData("Taskfy", "tasks");
        return res.status(200).json({
            message: tasks.message,
            token: tasks.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.post('/add-new-sprint',validateInput, async (req, res) => {
    const { sprint_name, sprint_description, sprint_starttime, sprint_endtime, sprint_team } = req.body;
    try {
        const newSprint = new Sprint_Schema({
            name: sprint_name,
            description: sprint_description,
            startTime: sprint_starttime,
            endTime: sprint_endtime,
            team: sprint_team
        })

        const results = await insertData('Taskfy', "sprints", newSprint);
        return res.status(201).json({
            message: results.message,
            token: results.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.get('/get-all-sprints', validateInput, async (req, res) => {
    try {
        const results = await getAllData("Taskfy", "sprints");
        return res.status(200).json({
            message: results.message,
            token: results.data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});

router.post('/delete-task/:id', validateInput, async (req, res) => {
    const id = req.params.id;
    try {
        const results = await deleteData('Taskfy', 'tasks', id);
        return res.status(201).json({
            message: results.message,
            token: results.taskId
        })
    } catch (error) {
        return res.status(500).json({
            message: error.response,
            err: error.err,
        });
    }
});
export default router;
