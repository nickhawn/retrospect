import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'reactstrap'
import Countdown, { zeroPad } from 'react-countdown'
import { useHub } from "../hooks/FeedbackHub"

export default function Timer() {
    const [currentTime, setCurrentTime] = useState(0)

    const {
        countdown,
        startCountdown
    } = useHub();

    const startTimer = () => startCountdown();

    useEffect(() => {
        setCurrentTime(Date.now() + countdown)
    }, [countdown])

    const renderer = ({ minutes, seconds }) =>
        (
            <div className="text-center display-4 container-fluid">
                <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
            </div>
        )

    return (
        <>
            <Countdown
                date={currentTime}
                key={currentTime}
                renderer={renderer}
            />
            <div className="text-center container-fluid">
                <Button onClick={startTimer}>Start</Button>
            </div>
        </>
    )
}