import express from "express";
import router from "./src/routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const mongoDB = "mongodb://127.0.0.1/My_Database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", console.error.bind(console, "MongoDB connected"));

app.use(express.json());
app.use("/api", router);

//server
const port = process.env.PORT || 3000; //application will run on the server if available or on local host 3000
app.listen(port, () => console.log(`Listening to port ${port}...`));
