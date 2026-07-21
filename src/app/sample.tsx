import {useState} from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from 'expo-router/build/react-navigation';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sample() {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  
  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.text}>Sample Content/Page for reference</ThemedText>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', color: theme.text}}
          onChangeText={text => setMessage(text)}
          value={message}
          placeholder="Type something..."
        />
        <ThemedText>Message of the day: {message}</ThemedText>

        <Button onPress={() => console.log('Button pressed!')}>
          Press Me (check console)
        </Button>

      </SafeAreaView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  text:{
    textAlign: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    gap: Spacing.three,
  },
});
