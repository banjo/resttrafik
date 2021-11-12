import axios from "axios";
import AxiosDigestAuth from "@mhoc/axios-digest-auth";
import { Station } from "../types/types";

const digestAuth = new AxiosDigestAuth({
    username: "tagtider",
    password: "codemocracy",
});

export const getStation = async (
    stationId: number
): Promise<Station | null> => {
    try {
        const response = await digestAuth.request({
            url: `http://api.tagtider.net/v1/stations/${stationId}.json`,
            method: "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Could not fetch station data: " + error);
        return null;
    }
};
