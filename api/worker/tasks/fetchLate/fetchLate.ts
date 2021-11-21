import { getStation } from "../../../src/providers/tagtider";
import { addOrUpdateDelays } from "../../../src/services/prisma";
import { sendTelegramMessage } from "../../../src/services/telegram";
import { Transfer } from "../../../src/types/types";
import { isQualifiable } from "./rules";

const GOTHENBURG_ID = 82;

const main = async () => {
    console.log("Started worker for transfers...");
    const station = await getStation(GOTHENBURG_ID);

    if (station === null) {
        console.error(
            `Could not fetch station with id ${GOTHENBURG_ID} från tagtider.`
        );
        return;
    }

    console.log("Found station...");

    const transfers = station.station.transfers.transfer;

    console.log(`Found ${transfers.length} transfers...`);

    const transfersToSave: Transfer[] = [];
    for (const transfer of transfers) {
        if (isQualifiable(transfer)) {
            console.log("Will save delay ", transfer);
            transfersToSave.push(transfer);
        }
    }

    console.log(`Found ${transfersToSave.length} delays...`);

    if (transfersToSave.length === 0) return;

    await addOrUpdateDelays(transfersToSave);
    sendTelegramMessage(`Added ${transfersToSave.length} new delay(s)...`);
    console.log(`Saved delays successfully...`);
};

export default main;
