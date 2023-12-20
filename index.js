import express from 'express';
import dotenv from 'dotenv';
import Database  from "./Utils/Database.js";
import router from './Routes/Routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.send({ message: "Welcome to Taskfy" });
});

app.use('/api', router);

(async () => {
    try {
        const client = await Database.connect();
        if (client) {
            console.log("Database connected successfully");
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    } catch (error) {
        console.log('Error connecting to the database: ' + error.message);
    }
})();
