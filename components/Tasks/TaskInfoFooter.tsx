import { View, TouchableHighlight, StyleSheet } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import global from '../../styles/global';
import { TasksContext } from '../../hooks/ContextProvider';
import { useNavigation } from '@react-navigation/native';

interface TaskInfoFooterProps {
  setShowTask: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskModel;
}

export default function TaskInfoFooter({
  setShowTask,
  task,
}: TaskInfoFooterProps) {
  const { tasks, setTasks } = React.useContext(TasksContext);
  const navigation = useNavigation();

  const completeTask = () => {
    const index = tasks.findIndex((t: TaskModel) => t.id === task.id);
    const oldTasks: TaskModel[] = [...tasks];
    oldTasks[index].favorite = false;
    oldTasks[index].completed = true;
    setTasks(oldTasks);
  };

  const deleteTask = () => {
    const index = tasks.findIndex((t: TaskModel) => t.id === task.id);
    const oldTasks = [...tasks];
    oldTasks.splice(index, 1);
    setTasks(oldTasks);
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
      <TouchableHighlight>
        <Ionicons
          name="ios-checkmark-circle"
          size={40}
          color={global.blue.color}
          onPress={completeTask}
        />
      </TouchableHighlight>
      <TouchableHighlight>
        <MaterialIcons
          name="delete-outline"
          size={30}
          color="black"
          onPress={deleteTask}
        />
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
