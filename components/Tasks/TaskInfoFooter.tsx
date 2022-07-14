import { View, TouchableHighlight, StyleSheet } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import global from '../../styles/global';

interface TaskInfoFooterProps {
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
  task: TaskModel;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}

export default function TaskInfoFooter({
  setShowTask,
  navigation,
  task,
  tasks,
  setTasks,
  status,
  setStatus,
}: TaskInfoFooterProps) {
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
  return (
    <View style={styles.footer}>
      <TouchableHighlight
        onPress={() => {
          setShowTask(false);
          navigation.navigate('Update Task', { task });
        }}>
        <FontAwesome name="edit" size={30} color="black" />
      </TouchableHighlight>
      <TouchableHighlight onPress={() => updateStatus()}>
        <Ionicons
          name="ios-checkmark-circle"
          size={40}
          color={global.blue.color}
        />
      </TouchableHighlight>
      <TouchableHighlight>
        <MaterialIcons name="delete-outline" size={30} color="black" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: '#dedede',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
});