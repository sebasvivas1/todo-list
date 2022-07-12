import { View, Text, Modal, TextInput, StyleSheet, Button } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import { faker } from '@faker-js/faker';

interface NewTaskProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
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
    const task: TaskModel = {
      id: faker.database.mongodbObjectId(),
      title: taskName,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
      favorite: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, task]);
    setTaskName('');
    setTaskDescription('');
    setTaskPriority(0);
    setTaskStatus(0);
    setShowModal(false);
  };
  return (
    <Modal
      visible={showModal}
      //   transparent
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
