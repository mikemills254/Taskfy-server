import Database from "../Utils/Database.js";

class Controller{
    static async insertData(dbName, collectionName, data) {
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
    
    static async getAllData(dbName, collectionName) {
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
    
    static async deleteData(dbName, collectionName, id) {
        const client = await Database.connect();
        const Db = client.db(dbName);
        const Collection = Db.collection(collectionName);
    
        try {
            const result = await Collection.deleteOne( {"_id": new ObjectId(id)} );
    
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
    
    static async subTask(dbName, collectionName, id, data) {
        const client = Database.connect()
        const Db = client.db(dbName)
        const Collection = Db.collection(collectionName)
        
        try {
            const results = Collection.updateOne({
                _id: new ObjectId(id),
                _data: data
            })
    
            if(results){
                return{
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
    
}

export default Controller