import express from 'express'
import dotenv from 'dotenv';
import { DataBase } from "./Utils/Database.js";
import router from './Routes/Routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000


app.get('/', (req, res) => {
    return res.send({ message: "Welcome to Taskfy" })
})

app.use(express.json());
app.use('/api/v1', router)


//connect to database and run the server.

(async () => {
    try {
        const client = await DataBase.Connect()
        if(client){
            console.log("Database connected successfully")
            app.listen(PORT, ()=>{
                console.log(`Server is running on port ${PORT}`)
            })
        }
    } catch (error) {
        console.log('Error connecting to database'+ error.message)
    }
})()