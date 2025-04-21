import { View, Text, StyleSheet } from 'react-native';

export default function Section2Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Section 2</Text>
      <Text style={styles.description}>This section is under development</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
}); 