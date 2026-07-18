import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
export default function PomodoroMain() {

    //setInterval(() => {console.log("testing")}, 1000)
    return (
        <ThemedView style={[styles.container, { backgroundColor: useTheme().background }]}>
            <ThemedText>Pomodoro Main Component</ThemedText>

            <ThemedText>Timer placeholder</ThemedText>


        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
});