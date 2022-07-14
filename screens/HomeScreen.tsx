import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Home from '../components/Landing/Home';
import TaskModel from '../models/Task';

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);
  const [activeTasks, setActiveTasks] = React.useState<Array<TaskModel>>([]);
  const [completedTasks, setCompletedTasks] = React.useState<Array<TaskModel>>(
    [],
  );
  const getData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@storage_Key');
      if (storedTasks !== null) {
        const allTasks: TaskModel[] = JSON.parse(storedTasks);
        setTasks(allTasks);
        const completed = allTasks.filter(task => task.status === 1);
        const currentTasks = allTasks.filter(task => task.status === 0);
        setActiveTasks(currentTasks);
        setCompletedTasks(completed);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Home
      navigation={navigation}
      allTasks={tasks}
      setAllTasks={setTasks}
      tasks={activeTasks}
      setTasks={setActiveTasks}
      completedTasks={completedTasks}
    />
  );
}
