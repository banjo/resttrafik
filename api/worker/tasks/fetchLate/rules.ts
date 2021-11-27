import { Transfer } from "../../../src/types/types";
import { getCurrentDate, isBetweenDates, isValidDate } from "./helpers";

const stationToPass = process.env.STATION_TO_PASS || "trollhättan";
const minutesToBeLate = process.env.MINUTES_TO_BE_LATE || 20;
const timesAtStation = [
    {
        start: "06:00",
        end: "09:30",
    },
    {
        start: "15:00",
        end: "20:30",
    },
];
const canceledText = "inställt";

const atStationBetweenTimes = (transfer: Transfer) => {
    const expected = isValidDate(new Date(transfer.arrival))
        ? new Date(transfer.arrival)
        : new Date(transfer.departure);

    for (const time of timesAtStation) {
        const start = new Date(`${getCurrentDate(expected)}T${time.start}`);
        const end = new Date(`${getCurrentDate(expected)}T${time.end}`);

        if (isBetweenDates(expected, start, end)) return true;
    }

    return false;
};

const isLate = (transfer: Transfer) => {
    if (transfer.newArrival === null && transfer.newDeparture === null)
        return false;

    const expected = isValidDate(new Date(transfer.arrival))
        ? new Date(transfer.arrival)
        : new Date(transfer.departure);

    const late = transfer.newArrival || transfer.newDeparture;

    if (late === null || !isValidDate(new Date(late))) {
        console.error(
            "Could not get late transfer time for transfer: ",
            transfer
        );
        return false;
    }

    const diffMs = new Date(late).valueOf() - expected.valueOf();
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    if (diffMins >= minutesToBeLate) return true;

    return false;
};

const passesCorrectStation = (transfer: Transfer) => {
    return (
        transfer.destination
            .toLowerCase()
            .includes(stationToPass.toLowerCase()) ||
        transfer.origin.toLowerCase().includes(stationToPass.toLowerCase())
    );
};

const isCanceled = (transfer: Transfer) => {
    return transfer.comment?.toLowerCase().includes(canceledText);
};

const rules: ((transfer: Transfer) => boolean)[] = [
    isLate,
    passesCorrectStation,
    // atStationBetweenTimes,
];

export const isQualifiable = (transfer: Transfer) => {
    if (passesCorrectStation(transfer) && isCanceled(transfer)) {
        return true;
    }

    for (const rule of rules) {
        if (!rule(transfer)) return false;
    }

    return true;
};
