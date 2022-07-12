import React from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { faker } from '@faker-js/faker';
import Tasks from './components/Tasks/Task';
import TaskModel from './models/Task';

export default function App() {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);
  const [showModal, setShowModal] = React.useState(false);
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
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.tasksWrapper}>My Tasks</Text>
      <Modal
        visible={showModal}
        // transparent
        onRequestClose={toggleModal}
        animationType="slide">
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
            <Button title="Close Modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.items}>
        {tasks.map(task => (
          <View key={task.id}>
            <Tasks task={task} tasks={tasks} setTasks={setTasks} />
          </View>
        ))}
      </View>
      <Button title="Add Task" onPress={toggleModal} />
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  items: {
    padding: 20,
  },
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
