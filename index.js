import express from 'express'
const PORT = process.env.PORT || 4000;

const app = express()

app.get('/', (req, res) => {
    return res.send({ message: "Welcome to Taskfy" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});