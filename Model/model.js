import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const Task = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_line: {
        type: Date,
        required: true
    },
    team: {
        type: Array,
        required: false
    },
    tags: {
        type: Array,
        default: []
    }
})

const Sprint = mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    }
});


const Subtask = mongoose.Schema({
    task: Task,
    subtaskname: {
        type: String,
        required: true
    },
    subdescription: {
        type: String,
        required: true
    },
})

const User = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Task_Schema = mongoose.model("Task", Task)
const Sprint_Schema = mongoose.model("Sprint", Sprint)
const Subtask_Schema = mongoose.model("Subtask", Subtask)
const User_Schema = mongoose.model("User", User)

export {
    Task_Schema,
    Sprint_Schema,
    Subtask_Schema,
    User_Schema
}