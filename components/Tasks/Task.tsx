import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import TaskModel from '../../models/Task';
import TaskInfo from './TaskInfo';
interface TaskProps {
  task: TaskModel;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  navigation: any;
}

export default function Task({ task, tasks, setTasks, navigation }: TaskProps) {
  const [favorite, setFavorite] = React.useState(false);
  const [showTask, setShowTask] = React.useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const deleteTask = () => {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasks.splice(index, 1);
      setTasks([...tasks]);
    }
  };

  const toggleModal = () => {
    console.log('task modl');
    setShowTask(!showTask);
  };
  return (
    <Pressable onPress={toggleModal} style={styles.container}>
      <View style={styles.items}>
        <Text style={styles.text}>{task?.title || 'Task Name'}</Text>
        <View style={styles.itemsRight}>
          <TouchableHighlight onPress={toggleFavorite}>
            <Text>Fav</Text>
          </TouchableHighlight>
          <Button onPress={deleteTask} title="Delete" color="red" />
        </View>
      </View>
      <TaskInfo
        task={task}
        showTask={showTask}
        setShowTask={setShowTask}
        navigation={navigation}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    fontSize: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 10,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '400',
  },
  itemsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    marginRight: 15,
  },
});
