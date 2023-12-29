import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Utils/Firebase.js";
import { ObjectId } from 'mongodb';
import Database from "../Utils/Database.js";

async function signInEmailAndPassword(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {
            message: "Successfully signed in",
            data: { user }
        };
    } catch (error) {
        return {
            message: 'An error has occurred',
            error: [
                { field: 'general', message: error.message },
            ]
        };
    }
}

async function resetPassword(email) {
    try {
        const results = await sendPasswordResetEmail(auth, email);
        return {
            message: `Check your inbox at ${email} to reset the password.`,
            data: results
        };
    } catch (error) {
        throw new Error({
            message: 'Unable to send a password reset link:' + error.message,
            code: error.code
        })
    }
}

async function loginEmailAndPassword(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {
            message: "Successfully created an account",
            data: { user }
        };
    } catch (error) {
        console.log('error logging into account', error.message);
    }
}

async function insertData(dbName, collectionName, data) {
    try {
        const db = Database.client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);

        return {
            message: "Successfully",
            data: result
        };
    } catch (error) {
        throw new Error({
            response: 'Failed to upload data',
            err: error.message
        });
    }
}

async function getAllData(dbName, collectionName) {
    try {
        const client = await Database.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.find({}).toArray();

        return {
            message: "Successfully fetched data from the database",
            data: result,
        };
    } catch (error) {
        throw new Error({
            response: "Failed to fetched data from database",
            err: error.message
        });
    }
}

async function deleteData(dbName, collectionName, id) {
    const client = await Database.connect();
    const Db = client.db(dbName);
    const Collection = Db.collection(collectionName);

    try {
        const result = await Collection.deleteOne({ "_id": new ObjectId(id) });

        if (!result.deletedCount) {
            throw 'No Task Found';
        }

        return {
            response: 'Task successfully deleted',
            taskId: id,
        };
    } catch (error) {
        console.error('Error deleting task:', error);
        throw {
            response: 'Unable to delete task',
            err: error.message,
        };
    }
}

async function subTask(dbName, collectionName, id, data) {
    const client = Database.connect()
    const Db = client.db(dbName)
    const Collection = Db.collection(collectionName)

    try {
        const results = Collection.updateOne({
            _id: new ObjectId(id),
            _data: data
        })

        if (results) {
            return {
                message: `Subtask added`,
                data: results
            }
        }
    } catch (error) {
        throw new Error({
            response: "Failed to add subtask",
            err: error.message
        })
    }
}

export {
    signInEmailAndPassword,
    resetPassword,
    loginEmailAndPassword,
    insertData,
    getAllData,
    deleteData,
    subTask
};
