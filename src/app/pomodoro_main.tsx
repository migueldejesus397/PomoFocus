import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { timerStyles } from '@/components/timer/timer-styles';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'
import Timer from '@/components/timer/timer-main';

export default function PomodoroMain() {

    // phase logic
    const [currentPhase, setCurrentPhase] = useState('focus');

    const [focusColour, setFocusColour] = useState('#1E1E1E');
    const [shortBreakColour, setShortBreakColour] = useState('#7BAE7F');
    const [longBreakColour, setLongBreakColour] = useState('#A78BFA');

    const backgroundColour = useSharedValue(focusColour);
    const animatedStyle = useAnimatedStyle (() => ({
        backgroundColor: withTiming(backgroundColour.value, {duration: 500})
    }));

    const handlePhaseChange = (phase: string) => {
        if (phase === 'focus'){
            setCurrentPhase('focus');
            backgroundColour.value = focusColour;
        }
        else if (phase === 'short-break'){
            setCurrentPhase('short-break');
            backgroundColour.value = shortBreakColour;
        }
        else if (phase === 'long-break'){
            setCurrentPhase('long-break');
            backgroundColour.value = longBreakColour;
        }
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <ThemedView style={[styles.childContainer, {backgroundColor: 'transparent'}]}>
                <ThemedView style={[styles.childContainer, {backgroundColor: 'transparent'}]}>
                    <ThemedText>Progress Display Placeholder</ThemedText>
                </ThemedView>
                <ThemedView style={[timerStyles.buttonRow, {backgroundColor: 'transparent'}]}>
                    <Pressable onPress={() => {handlePhaseChange('focus')}} style={timerStyles.phaseButton}><ThemedText>Focus</ThemedText></Pressable>
                    <Pressable onPress={() => {handlePhaseChange('short-break')}} style={timerStyles.phaseButton}><ThemedText>Short Break</ThemedText></Pressable>
                    <Pressable onPress={() => {handlePhaseChange('long-break')}} style={timerStyles.phaseButton}><ThemedText>Long Break</ThemedText></Pressable>
                </ThemedView>
                <Timer key={currentPhase} phase={currentPhase} />
            </ThemedView>
            <ThemedView style={[styles.childContainer, {backgroundColor: 'transparent'}]}>
                <ThemedText>Task Component Placeholder</ThemedText>
            </ThemedView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    },

    childContainer: {
    width: '100%',
    alignItems: 'center',
    },
});