import express from 'express';

import { getData } from './database.js';

const app = express();

app.get('/data', async (req, res) => {
    const data = await getData();
    res.status(200).json({ data })
});

app.get("/hello", (req, res) => res.send("Hello World!"));


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something wentwrong");
})

app.listen(8080, () => {
    console.log("Server running at 8080")
})