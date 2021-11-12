import { CronJob } from "cron";
import fetchLate from "./tasks/fetchLate/fetchLate";

const cronjob = new CronJob("* * * * * *", async () => {
    await fetchLate();
});

// cronjob.start();

fetchLate();
