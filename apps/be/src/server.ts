import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GridRouter } from "./generator/routes/grid.router";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const gridRouter = new GridRouter();
app.use("/api", gridRouter.getRouter());


app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
