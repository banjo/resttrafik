import dayjs from "dayjs";
import "dayjs/locale/sv"; // import locale
import { Delay } from "../../types";

interface DelayCardProps {
    delay: Delay;
}

const getTime = (date: Date) => {
    return dayjs(date).format("HH:mm");
};

const isArrival = (delay: Delay) => {
    return delay.destination === "";
};

const getTravelPath = (delay: Delay) => {
    const arrival = isArrival(delay);

    if (arrival) return "Från: " + delay.origin.replaceAll(",", ", ");

    return "Till: " + delay.destination.replaceAll(",", ", ");
};

const getDate = (delay: Delay) => {
    return dayjs(delay.newTime).locale("sv").format("dddd DD MMMM");
};

export const DelayCard = (props: DelayCardProps) => {
    const { delay } = props;
    return (
        <div className="w-10/12 md:w-2/3 h-40 bg-bluegray-700 rounded-xl border-none text-xl relative">
            <span className="absolute left-4 top-4 font-bold text-xl md:text-2xl">
                {delay.type}
            </span>
            <span className="absolute top-11 left-4 text-sm md:text-base text-gray-400">
                {getDate(delay)}
            </span>

            <span className="text-red-600 absolute top-4 right-4 text-xl md:text-2xl font-bold line-through">
                {getTime(delay.expectedTime)}
            </span>
            <span className="text-green-400 absolute top-4 right-20 md:right-24 text-xl md:text-2xl font-bold">
                {getTime(delay.newTime)}
            </span>

            <span className="absolute bottom-12 md:bottom-4 left-4 text-sm md:text-base text-white">
                {getTravelPath(delay)}
            </span>

            <span className="absolute left-4 bottom-4 md:bottom-9 text-sm md:text-base font-bold ">
                {delay.info}
            </span>

            <span className="absolute right-4 bottom-4 text-base md:text-2xl font-bold">
                {"Spår: " + delay.track}
            </span>
        </div>
    );
};
