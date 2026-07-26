import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect } from 'react';
import { Button } from 'expo-router/build/react-navigation';
import Timer from '@/components/timer/timer-main';


export default function PomodoroMain() {

    let current_phase = 'focus';

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.childContainer}>
                <Timer />
            </ThemedView>
            <ThemedView style={styles.childContainer}>
                <ThemedText>Live from my MAC!</ThemedText>
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
    }
});