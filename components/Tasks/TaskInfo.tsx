import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskInfoProps {
  task: TaskModel;
  showTask: boolean;
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
}

export default function TaskInfo({
  task,
  showTask,
  setShowTask,
  navigation,
  tasks,
  setTasks,
}: TaskInfoProps) {
  const [status, setStatus] = React.useState(task.status);
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [priority, setPriority] = React.useState(task.priority);
  const updateStatus = () => {
    if (status === 0) {
      task.status = 1;
      setStatus(1);
      const index = tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        tasks[index] = task;
        setTasks([...tasks]);
        setShowTask(false);
      }
    }
  };

  const saveStatus = async (tasksArr: TaskModel[]) => {
    const jsonValue = JSON.stringify(tasksArr);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  };

  React.useEffect(() => {
    saveStatus(tasks);
  }, [tasks]);

  //   const updateTask = () => {
  //     task.title = title;
  //     task.description = description;
  //     task.priority = priority;
  //   }

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
    <Modal
      visible={showTask}
      transparent
      animationType="slide"
      onRequestClose={() => setShowTask(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.container}>
            <Text style={styles.modalTitle}>{task?.title}</Text>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor={'#fff'}
              style={styles.close}
              onPress={() => setShowTask(!showTask)}>
              <Text>X</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.taskInfoContainer}>
            <View style={styles.top}>
              <Text style={{ marginBottom: 4 }}>
                Created on: {formatDate() || 'Date'}
              </Text>
              <Text style={[status === 0 ? styles.pending : styles.done]}>
                {status === 0 ? 'Pending' : 'Done'}
              </Text>
            </View>
            <View>
              <Text style={styles.priority}>Priority: {getPriority()}</Text>
            </View>
            <Text style={styles.taskInfo}>{task?.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableHighlight onPress={() => updateStatus()}>
          <Text>Done</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            setShowTask(false);
            navigation.navigate('Details', { task });
          }}>
          <Text>Edit Task</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>Delete</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#558DED',
    height: 60,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  modalView: {
    margin: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  close: {
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: { color: '#fff', fontSize: 20 },
  taskInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  taskInfo: {
    fontSize: 16,
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 40,
  },
  done: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
  priority: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
  },
});
