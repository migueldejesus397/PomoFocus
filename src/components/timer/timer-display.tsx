import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'expo-router/build/react-navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect, useRef } from 'react';

// total milliseconds of however long the timer should run for
const TIMER_DURATION_TESTING = 1500000;

// UI variables
const { height, width } = Dimensions.get('window');
const responsiveFontSize = Math.min(Math.max(width * 0.1, 28), 56);
const containerWidth = Math.min(width * 0.9, 500);
const containerHeight = Math.min(height * 0.24, 180);
const controlButtonWidth = Math.min(width * 0.24, 110);
const buttonGap = Math.min(width * 1, 5);

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
    <ThemedView style={[styles.container]}>
        <ThemedText id="timer-display" style={[styles.timerText, { backgroundColor: background }]}>
            {formatTime(milliseconds, showMs)}
        </ThemedText>

        <ThemedView style={styles.buttonRow}>
            <Button onPress={() => !isRunning ? setIsRunning(true) : setIsRunning(false)} style={[styles.controlButton, { backgroundColor: background }]}>
                {!isRunning ? 'Start' : 'Pause'} 
            </Button>
        </ThemedView>
        <ThemedView style={styles.buttonRow}>
            <Button onPress={() => {
                setIsRunning(false);
                setMilliseconds(TIMER_DURATION_TESTING);
            }} style={[styles.controlButton, { backgroundColor: background }]}>
                Reset
            </Button>
            <Button onPressIn={() => {if (showMs) {setShowMs(false)} else {setShowMs(true)}}}
            style={[styles.controlButton, { backgroundColor: background }]}>
                ms
            </Button>
        </ThemedView>
    </ThemedView>
);
}


const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        minHeight: containerHeight,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.02,
    },
    timerText: {
        fontSize: responsiveFontSize,
        fontWeight: '700',
        textAlign: 'center',
        width: '100%',
        maxWidth: containerWidth - width * 0.08,
        lineHeight: responsiveFontSize + 6,
        includeFontPadding: false,
        marginBottom: height * 0.025,
        fontVariant: ['tabular-nums'],
    },
    controlButton: {
        height: Math.min(height * 0.06, 52),
        minHeight: 44,
        width: controlButtonWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: buttonGap,
        width: '100%',
    },
});