import express from "express";
import cors from "cors";
import routesV1 from "./routes/v1";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use("/api/v1", routesV1);

export default app;
