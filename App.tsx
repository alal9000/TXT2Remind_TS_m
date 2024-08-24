import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MessageForm from './components/MessageForm';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TXT2REMIND</Text>
      <MessageForm />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    marginBottom: 20
  }
});
