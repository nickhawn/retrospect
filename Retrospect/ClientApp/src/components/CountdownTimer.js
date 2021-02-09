import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import Countdown, { zeroPad } from 'react-countdown';

let times = [300000, 240000, 180000, 120000, 60000];

export default function Timer() {
    const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(Date.now() + times[currentTimeIndex]);

    const clockRef = useRef();
    const handleStart = () => clockRef.current.start();
    const onComplete = () => {
        setCurrentTimeIndex(currentTimeIndex + 1)
    }

    useEffect(() => {
        if (times.length > currentTimeIndex)
            setCurrentTime(Date.now() + times[currentTimeIndex])
    }, [currentTimeIndex]);

    const renderer = ({ minutes, seconds }) => {
        return (
            <>
                <div className="text-center container-fluid">
                    <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>

                </div>
                <div className="text-center container-fluid">
                    <Button onClick={handleStart}>Start</Button>
                </div>
                
            </>
        );
    };

    return (
        <Countdown
            date={currentTime}
            key={currentTimeIndex}
            autoStart={false}
            ref={clockRef}
            onComplete={onComplete}
            renderer={renderer}
        />
    );
}