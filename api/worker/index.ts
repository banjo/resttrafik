import { CronJob } from "cron";
require("dotenv").config({ path: "../.env" });
import fetchLate from "./tasks/fetchLate/fetchLate";

const cronExpression = process.env.CRON_JOB_TIME || "0 * * * * *"; // every minute

const cronjob = new CronJob(cronExpression, fetchLate);

cronjob.start();
