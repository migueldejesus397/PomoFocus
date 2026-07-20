import { StyleSheet } from 'react-native';
import { Button } from 'expo-router/build/react-navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect, useRef } from 'react';


const TIMER_DURATION_TESTING = 10000;

export default function Timer() {
    const { background } = useTheme();
    const [isRunning, setIsRunning] = useState(false);
    const [milliseconds, setMilliseconds] = useState(TIMER_DURATION_TESTING);

    const endTimeRef = useRef(0);
    
    useEffect(() => {
        if (isRunning){

            endTimeRef.current = Date.now() + milliseconds;

            const interval = setInterval(() => {
                const msRemaining = Math.max(0, endTimeRef.current - Date.now());
                setMilliseconds(msRemaining);

                if (msRemaining <= 0){
                    clearInterval(interval);
                    setIsRunning(false);
                }
            }, 100);

            return(() => {
                clearInterval(interval);
            });           
        }
    }, [isRunning, milliseconds])


    return (
        <ThemedView style={[styles.container, { backgroundColor: background }]}>
            <ThemedText id="timer-display" style={[styles.timerText, {backgroundColor: background}]}>
                {milliseconds}
            </ThemedText>

            <Button onPress={() => setIsRunning(true)} style={[styles.controlButton, { backgroundColor: background }]}>
                Start
            </Button>
            <Button onPress={() => setIsRunning(false)} style={[styles.controlButton, { backgroundColor: background }]}>
                Pause
            </Button>
            <Button onPress={() => {
                setIsRunning(false);
                setMilliseconds(TIMER_DURATION_TESTING);
            }} style={[styles.controlButton, { backgroundColor: background }]}>
                Reset
            </Button>

        </ThemedView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 60,
        fontWeight: 'bold',
        padding: 40,
    },
    controlButton:{
        
        margin: 'auto',
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        
    }
});