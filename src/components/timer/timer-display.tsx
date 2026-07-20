import { StyleSheet } from 'react-native';
import { Button } from 'expo-router/build/react-navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect, useRef } from 'react';


const TIMER_DURATION_TESTING = 10

export default function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(TIMER_DURATION_TESTING);
    
    useEffect(() => {
        if (isRunning && time > 0){
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return(() => {
                clearInterval(interval);
            });           
        }
    }, [isRunning, time])


    return (
        <ThemedView style={[styles.container, { backgroundColor: useTheme().background }]}>
            <ThemedText id="timer-display" style={[styles.timerText, {backgroundColor: 'lightblue'}]}>
                {time}
            </ThemedText>

            <Button onPress={() => setIsRunning(true)} style={styles.controlButton}>
                Start
            </Button>
            <Button onPress={() => setIsRunning(false)} style={styles.controlButton}>
                Pause
            </Button>
            <Button onPress={() => {
                setIsRunning(false);
                setTime(TIMER_DURATION_TESTING);
            }} style={styles.controlButton}>
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