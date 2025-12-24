import express from "express";
import bodyParser from "body-parser";
import {connectDB} from "./db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB().then(() => {
  console.log('DB ready');
}).catch(err => {
  console.error('DB connection error:', err);
});

export default app;

