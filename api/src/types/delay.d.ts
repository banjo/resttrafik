import { Delay } from ".prisma/client";

export interface updateableDelay extends Delay {
    id: number;
}
