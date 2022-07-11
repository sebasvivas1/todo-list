import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Tasks from './components/Tasks';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.tasksWrapper}>My Tasks</Text>
      <View>
        <Tasks />
        <Tasks />
        <Tasks />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
});
