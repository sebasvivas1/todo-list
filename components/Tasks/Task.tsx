import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TaskModel from '../../models/Task';

interface TaskProps {
  task: TaskModel;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
}

export default function Task({ task, tasks, setTasks }: TaskProps) {
  const [favorite, setFavorite] = React.useState(false);

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
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <View>
          <Text style={styles.text}>{task?.title || 'Task Name'}</Text>
        </View>
        <View style={styles.itemsRight}>
          <Button onPress={toggleFavorite} title="Fav" color="green" />
          <Button onPress={deleteTask} title="Dlt" color="red" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    fontSize: 12,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    // flexWrap: 'wrap',
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
  },
});
