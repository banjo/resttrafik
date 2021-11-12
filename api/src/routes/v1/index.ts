import { Delay } from ".prisma/client";
import express from "express";
import { addDelay, getDelays } from "../../services/prisma";

const router = express.Router();

router.get("/delays", async (req, res) => {
    const allDelays = await getDelays();
    res.json(allDelays);
});

router.post("/delay", async (req, res) => {
    const delay = req.body as Delay;
    const newId = await addDelay(delay);
    res.json(newId);
});

export default router;
