import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Task from '../Tasks/Task';
import Footer from '../common/Footer';
import NewTask from '../Tasks/NewTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global';
import NoTasks from '../common/NoTasks';
interface HomeProps {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);

  const toggleFavorite = (task: TaskModel) => {
    if (tasks !== undefined) {
      const index = tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        tasks[index].favorite = !tasks[index].favorite;
        setTasks([...tasks]);
        updateTask();
      }
    }
  };
  const deleteTask = (task: TaskModel) => {
    if (tasks !== undefined) {
      const index = tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        tasks.splice(index, 1);
        setTasks([...tasks]);
        updateTask();
      }
    }
  };

  const updateTask = async () => {
    if (tasks !== undefined) {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(tasks));
    }
  };
  const getData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@storage_Key');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
        console.log(storedTasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={global.container}>
      <View style={global.header}>
        <Text style={global.title}>Active Tasks</Text>
      </View>
      <ScrollView>
        <View>
          {tasks.length > 0 && tasks !== undefined ? (
            <View>
              {tasks.map((task: TaskModel) => (
                <View key={task?.id}>
                  <Task task={task} tasks={tasks} setTasks={setTasks} />
                </View>
              ))}
            </View>
          ) : (
            <NoTasks />
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}
