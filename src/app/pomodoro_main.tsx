import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useState, useEffect } from 'react';
import Timer from '@/components/timer/timer-display';


export default function PomodoroMain() {

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.childContainer}>
                <Timer/>
            </ThemedView>
            <ThemedView style={styles.childContainer}>
                <ThemedText>Testing</ThemedText>
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