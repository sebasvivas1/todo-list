import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Home from '../components/Landing/Home';
import TaskModel from '../models/Task';

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);
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
    navigation.addListener('focus', () => {
      getData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Home navigation={navigation} tasks={tasks} setTasks={setTasks} />;
}
