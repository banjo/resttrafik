import { getDelays } from "../../api";
import { Delay } from "../../types";
import React, { useEffect, useState } from "react";
import { DelayCard } from "../DelayCard";
import { auth } from "../../lib/firebase";

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

    const logout = () => {
        auth.signOut();
    };

    return (
        <div
            className={
                "w-full bg-bluegray-800 flex flex-col items-center space-y-8"
            }
        >
            <button onClick={logout}>Logga ut</button>

            {delays.length > 0 ? (
                <div className="flex flex-col items-center justify-center w-full space-y-10">
                    {delays.map((delay, index) => {
                        return <DelayCard delay={delay} key={index} />;
                    })}
                </div>
            ) : (
                <div>Inga avgångar sparade just nu</div>
            )}

            <div className="mt-20"></div>
        </div>
    );
};
