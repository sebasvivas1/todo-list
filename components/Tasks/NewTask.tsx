import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NewTaskProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: Array<TaskModel>;
  setTasks: any;
}

export default function NewTask({
  showModal,
  setShowModal,
  tasks,
  setTasks,
}: NewTaskProps) {
  const [taskName, setTaskName] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskPriority, setTaskPriority] = React.useState<number>(0);
  const [taskStatus, setTaskStatus] = React.useState<number>(0);
  const addTask = () => {
    if (taskName.length > 0 && taskDescription.length > 0) {
      try {
        const task: TaskModel = {
          id: faker.database.mongodbObjectId(),
          title: taskName,
          description: taskDescription,
          priority: 0,
          status: 0,
          favorite: true,
          createdAt: new Date(),
        };
        setTasks([...tasks, task]);
        setShowModal(false);
        setTaskName('');
        setTaskDescription('');
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
      // console.log(jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    saveData(tasks);
  }, [tasks]);
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
      animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Task</Text>
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
          <Button
            title="Close Modal"
            onPress={() => setShowModal(!showModal)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
