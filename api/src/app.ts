import express from "express";
import cors from "cors";
import routesV1 from "./routes/v1";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin, optionsSuccessStatus: 200 }));

app.use("/api/v1", routesV1);

export default app;
