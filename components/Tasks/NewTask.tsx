import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global';
import Footer from '../common/Footer';

interface NewTaskProps {
  tasks: Array<TaskModel>;
  setTasks: any;
  navigation: any;
}

export default function NewTask({ tasks, setTasks, navigation }: NewTaskProps) {
  const [taskName, setTaskName] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskPriority, setTaskPriority] = React.useState<number>(0);
  const addTask = () => {
    if (taskName.length > 0 && taskDescription.length > 0) {
      try {
        const task: TaskModel = {
          id: faker.database.mongodbObjectId(),
          title: taskName,
          description: taskDescription,
          priority: taskPriority,
          status: 0,
          favorite: true,
          createdAt: new Date(),
        };
        setTasks([...tasks, task]);
        setTaskName('');
        setTaskDescription('');
        navigation.navigate('Home');
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  const saveData = async (tasksArr: TaskModel[]) => {
    try {
      const jsonValue = JSON.stringify(tasksArr);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      console.log('Saved:', jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    saveData(tasks);
  }, [tasks]);
  return (
    <View style={global.container}>
      <ScrollView>
        <Text style={global.title}>Add Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          onChange={e => setTaskName(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Task Description"
          onChange={e => setTaskDescription(e.nativeEvent.text)}
        />
        <Button title="Create Task!" onPress={addTask} />
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
