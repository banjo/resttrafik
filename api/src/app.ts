import express from "express";
import cors from "cors";
const morgan = require("morgan");
import routesV1 from "./routes/v1";

const app = express();

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin, optionsSuccessStatus: 200 }));

const baseUrl = process.env.NODE_ENV === "production" ? "/v1" : "/api/v1";

console.log("URL used: " + baseUrl);

app.use(baseUrl, routesV1);

export default app;
