import { Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState, useEffect, useRef } from 'react';
import { timerStyles, timerUi } from '@/components/timer/timer-styles';

const durationMap: { [key: string]: any} = {};
durationMap['focus'] = 1500000;
durationMap['short-break'] = 300000;
durationMap['long-break'] = 1800000;

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
export default function Timer({phase}: {phase: string}) {
    const [isRunning, setIsRunning] = useState(false);
    const [milliseconds, setMilliseconds] = useState(() => durationMap[phase]);
    const [showMs, setShowMs] = useState(false);

    const endTimeRef = useRef(0);

    // main timer useEffect()
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
    <ThemedView style={[timerStyles.container, {backgroundColor: 'transparent'}]}>
        <Pressable onPressIn={() => {if (showMs) {setShowMs(false)} else {setShowMs(true)}}}><ThemedText id="timer-display" style={[
            timerStyles.timerText,
            !showMs ? { fontSize: timerUi.responsiveFontSizeLrg, lineHeight: timerUi.responsiveFontSizeLrg + 6,  } 
            : { fontSize: timerUi.responsiveFontSizeSml, lineHeight: timerUi.responsiveFontSizeLrg + 6 },
            ]}
        >
            {formatTime(milliseconds, showMs)}
        </ThemedText></Pressable>
        <ThemedText>Current Phase: {phase}</ThemedText>
        <ThemedView style={[timerStyles.buttonRow, {backgroundColor: 'transparent'}]}>
            <Pressable onPress={() => !isRunning ? setIsRunning(true) : setIsRunning(false)} style={timerStyles.controlButton}> 
                <ThemedText>{!isRunning ? 'Start' : 'Pause'}</ThemedText> 
            </Pressable>
            <Pressable onPress={() => {
                setIsRunning(false);
                setMilliseconds(durationMap[phase]);
            }} style={timerStyles.controlButton}> 
                <ThemedText>Reset</ThemedText>
            </Pressable>
        </ThemedView>
    </ThemedView>
);
}