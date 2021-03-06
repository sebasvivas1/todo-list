import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInfoFooter from './TaskInfoFooter';

interface TaskInfoProps {
  task: TaskModel;
  showTask: boolean;
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskInfo({
  task,
  showTask,
  setShowTask,
}: TaskInfoProps) {
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
              <Text style={styles.createdOn}>
                Created on: {formatDate() || 'Date'}
              </Text>
              <Text style={[!task?.completed ? styles.pending : styles.done]}>
                {!task?.completed ? 'Pending' : 'Done'}
              </Text>
            </View>
            <View>
              <Text style={styles.priority}>Priority: {getPriority()}</Text>
            </View>
            <Text style={styles.taskInfo}>{task?.description}</Text>
          </View>
        </View>
      </View>
      {!task?.completed ? (
        <TaskInfoFooter task={task} setShowTask={setShowTask} />
      ) : null}
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
  createdOn: {
    marginBottom: 4,
  },
});
