import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect } from 'react';
import { Button } from 'expo-router/build/react-navigation';
import { timerStyles } from '@/components/timer/timer-styles';
import Timer from '@/components/timer/timer-main';

export default function PomodoroMain() {

    const [currentPhase, setCurrentPhase] = useState('focus');
    const [currentBgColor, setCurrentBgColor] = useState('#1E1E1E')

    return (
        <ThemedView style={[styles.container, {backgroundColor: currentBgColor}]}>
            <ThemedView style={[styles.childContainer, {backgroundColor: 'transparent'}]}>
                <ThemedView style={[timerStyles.buttonRow, {backgroundColor: 'transparent'}]}>
                    <Button onPress={() => {setCurrentPhase('focus'); setCurrentBgColor('#1E1E1E')}} style={timerStyles.phaseButton}>Focus</Button>
                    <Button onPress={() => {setCurrentPhase('short-break'); setCurrentBgColor('#7BAE7F')}} style={timerStyles.phaseButton}>Short Break</Button>
                    <Button onPress={() => {setCurrentPhase('long-break'); setCurrentBgColor('#A78BFA')}} style={timerStyles.phaseButton}>Long Break</Button>
                </ThemedView>
                <Timer phase = {currentPhase} />
            </ThemedView>
            <ThemedView style={[styles.childContainer, {backgroundColor: 'transparent'}]}>
                <ThemedText>Task Component Placeholder</ThemedText>
            </ThemedView>
        </ThemedView>
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