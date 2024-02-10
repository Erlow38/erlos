import { useState } from "react";

export default function DateHour() {

    const [currentHour, setCurrentHour] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

    useState(() => {
        const interval = setInterval(() => {
            setCurrentHour(new Date().toLocaleTimeString());
            setCurrentDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className='hour'>{currentDate + " " + currentHour}</span>
    );
}