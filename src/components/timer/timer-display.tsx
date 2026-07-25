import { Button } from 'expo-router/build/react-navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect, useRef } from 'react';
import { timerStyles } from '@/components/timer/timer-styles';

// total milliseconds of however long the timer should run for
const TIMER_DURATION_TESTING = 1500000;

// helper function to convert the given milliseconds into variable 'chunks' of hours, minutes, and seconds
function getTimeChunks(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}

// formats time chunks to the final display string
function formatTime(milliseconds: number, showMs: boolean) {
    const { hours, minutes, seconds } = getTimeChunks(milliseconds);
    const ms = (milliseconds % 1000).toString().padStart(3, '0');

    return `${hours >= 1 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${showMs ? '.'+ms.toString() : ''}`;
}

// main timer component
export default function Timer() {
    const { background } = useTheme();
    const [isRunning, setIsRunning] = useState(false);
    const [milliseconds, setMilliseconds] = useState(TIMER_DURATION_TESTING);
    const [showMs, setShowMs] = useState(false);

    const endTimeRef = useRef(0);
    
    useEffect(() => {
        if (!isRunning){ return }

        endTimeRef.current = Date.now() + milliseconds;
        const interval = setInterval(() => {
            const msRemaining = Math.max(0, endTimeRef.current - Date.now());
            setMilliseconds(msRemaining);

            // cleanup code for when the timer hits zero
            if (msRemaining <= 0){
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 50);

        return(() => {
            clearInterval(interval);
        });           
    }, [isRunning, milliseconds])

return (
    <ThemedView style={[timerStyles.container]}>
        <ThemedText id="timer-display" style={timerStyles.timerText}>
            {formatTime(milliseconds, showMs)}
        </ThemedText>

        <ThemedView style={timerStyles.buttonRow}>
            <Button onPress={() => {
                setIsRunning(false);
                setMilliseconds(TIMER_DURATION_TESTING);
            }} style={[timerStyles.controlButton, { backgroundColor: background }]}> 
                Reset
            </Button>
            <Button onPress={() => !isRunning ? setIsRunning(true) : setIsRunning(false)} style={[timerStyles.controlButton, { backgroundColor: background }]}> 
                {!isRunning ? 'Start' : 'Pause'} 
            </Button>
            <Button onPressIn={() => {if (showMs) {setShowMs(false)} else {setShowMs(true)}}}
            style={[timerStyles.controlButton, { backgroundColor: background }]}> 
                ms
            </Button>
        </ThemedView>
    </ThemedView>
);
}