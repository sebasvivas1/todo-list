import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import global from '../../styles/global';
import Footer from '../common/Footer';

interface DetilsProps {
  task: TaskModel;
}

export default function Details({ task }: DetilsProps) {
  const getPriority = () => {
    switch (task.priority) {
      case 0:
        return 'Low';
      case 1:
        return 'High';
      case 2:
        return 'Critical';
      default:
        return 'Low';
    }
  };
  const formatDate = () => {
    const date = new Date(task.createdAt);
    return date.toDateString();
  };
  return (
    <View style={styles.container}>
      <Text style={global.title}>Details</Text>
      <ScrollView>
        <Text style={styles.text}>{task.title}</Text>
        <Text style={styles.text}>{task.description}</Text>
        <Text style={styles.text}>Priority: {getPriority()}</Text>
        <Text style={styles.text}>Created at: {formatDate()}</Text>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 5,
    textAlign: 'justify',
    flexWrap: 'wrap',
  },
});
