import { getDelays } from "../../api";
import { Delay } from "../../types";
import React, { useEffect, useState } from "react";
import { DelayCard } from "../DelayCard";

export const Dashboard = () => {
    const [delays, setDelays] = useState<Delay[]>([]);

    useEffect(() => {
        fetchDelays();
    }, []);

    const fetchDelays = async () => {
        const fetchedDelays = await getDelays();
        if (fetchedDelays == null) return;

        if (!Array.isArray(fetchedDelays)) {
            console.error("Delays is not an array");
            return;
        }

        setDelays(fetchedDelays);
    };

    return (
        <div
            className={
                "bg-bluegray-800 flex flex-col items-center text-white " +
                (delays.length > 5 ? "h-full" : "h-screen")
            }
        >
            <h1 className="text-5xl font-bold mt-10 mb-12">Resttrafik</h1>

            {delays.length > 0 && (
                <div className="flex flex-col items-center w-full space-y-10 mb-16">
                    {delays.map((delay, index) => {
                        return <DelayCard delay={delay} key={index} />;
                    })}
                </div>
            )}
        </div>
    );
};
