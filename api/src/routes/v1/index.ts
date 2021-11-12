import { Delay } from ".prisma/client";
import express from "express";
import { addDelay, getDelays, updateDelay } from "../../services/prisma";
import { DelayWithoutId } from "../../types/types";

const router = express.Router();

router.get("/delays", async (req, res) => {
    const allDelays = await getDelays();
    res.json(allDelays);
});

router.post("/delay", async (req, res) => {
    const delay = req.body as DelayWithoutId;
    const newId = await addDelay(delay);
    res.json(newId);
});

router.put("/delay", async (req, res) => {
    const delay = req.body as Delay;
    const success = await updateDelay(delay);

    if (!success) {
        console.error("Could not update delay with id " + delay.id);
        return res.status(500).json();
    }

    res.status(200).json();
});

export default router;
