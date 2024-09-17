const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const userRouter = require('./route/user-route');
const notesRouter = require('./route/notes-route');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter)
/*
app.get('/', (req, res) => {
    res.status(304).send("Hello from Express");
});
*/

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log("listening at port " + PORT);
        
    });
})
.catch((error) => {
    console.log(error);
});