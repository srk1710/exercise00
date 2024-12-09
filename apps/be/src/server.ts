import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GridRouter } from "./generator/routes/grid.router";
import { PaymentRouter } from "./payments/routes/payment.route";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { initWebSocketServer } from "./websockets/websocketServer";

const PORT = 3000;

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = process.env.MONGODB_URL;

if (!url) {
    throw new Error("MongoDB connection string is not defined in environment variables");
}

mongoose.Promise = global.Promise;
mongoose
    .connect(url)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err: Error) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

const gridRouter = new GridRouter();
app.use("/api", gridRouter.getRouter());

const paymentRouter = new PaymentRouter();
app.use("/api", paymentRouter.getRouter());

const server = http.createServer(app);
initWebSocketServer(server);

server.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
