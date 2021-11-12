import { Delay } from ".prisma/client";

export type DelayWithoutId = Omit<Delay, "id">;

export interface Station {
    station: {
        id: string;
        name: string;
        code: string;
        slug: string;
        lat: string;
        lng: string;
        transfers: {
            transfer: Transfer[];
        };
    };
}

export interface Transfer {
    id: string;
    arrival: string;
    newArrival: string | null;
    departure: string;
    newDeparture: string | null;
    origin: string;
    destination: string;
    track: string;
    train: string;
    type: string;
    comment: string | null;
    detected: string;
    updated: string;
}
