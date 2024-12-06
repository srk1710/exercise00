import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = 3000;

// create express app
const app = express();

app.use(cors());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
