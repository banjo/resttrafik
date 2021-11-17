import { axios } from "../lib/axios";
import { Delay } from "../types";

export const getDelays = async (): Promise<Delay[] | null> => {
    try {
        const response = await axios.get<Delay[]>("/delays");
        return response.data;
    } catch (error: any) {
        console.log(error);
        return null;
    }
};
