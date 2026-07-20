import { StyleSheet } from 'react-native';
import { Button } from 'expo-router/build/react-navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect, useRef } from 'react';


const TIMER_DURATION_TESTING = 1500000;

function getTimeChunks(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return { hours, minutes, seconds };
}

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
            }, 50);

            return(() => {
                clearInterval(interval);
            });           
        }
    }, [isRunning, milliseconds])


return (
  <ThemedView style={[styles.container, { backgroundColor: background }]}>
    <ThemedText id="timer-display" style={[styles.timerText, { backgroundColor: background }]}>
      {getTimeChunks(milliseconds).hours.toString().padStart(2, '0')} : {getTimeChunks(milliseconds).minutes.toString().padStart(2, '0')} : {getTimeChunks(milliseconds).seconds.toString().padStart(2, '0')} : {(milliseconds % 1000).toString().padStart(3, '0')}
    </ThemedText>

        <ThemedView style={styles.buttonRow}>
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
  </ThemedView>
);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    timerText: {
        height: 'auto',
        width: 'auto',
        fontSize: 40,
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
        
    },
        buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
});