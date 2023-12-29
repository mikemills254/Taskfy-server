import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.DB_PASS;
const uri = `mongodb+srv://mikemills930:${password}@cluster0.hbyydft.mongodb.net/checkout?retryWrites=true&w=majority`;

class Database {
    static client = null;

    static async connect() {
        try {
            if (Database.client) {
                return Database.client;
            }
    
            Database.client = new MongoClient(uri, {
                serverApi: {
                    version: '1',
                    strict: true,
                    deprecationErrors: true,
                },
            });
    
            await Database.client.connect();
    
            return Database.client;
        } catch (error) {
            console.error("Error connecting to the database:", error.message);
            throw new Error("Error connecting to the database");
        }
    }    

    static async disconnect() {
        try {
            if (Database.client) {
                await Database.client.close();
            }
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error.message);
        }
    }
}

export default Database;
