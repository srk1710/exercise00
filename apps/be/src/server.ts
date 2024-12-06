import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import gridRouter from "./generator/routes/grid.router";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/grid", gridRouter
);

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
