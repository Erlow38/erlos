import React, { useState, useEffect } from "react";

const DateHour: React.FC = () => {
    const [currentHour, setCurrentHour] = useState<string>(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString());

    useEffect(() => {
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

export default DateHour;
