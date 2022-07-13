import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import NewTask from '../components/Tasks/NewTask';
import TaskModel from '../models/Task';

export default function NewTaskScreen({ navigation }: any) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);
  const getData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@storage_Key');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return <NewTask navigation={navigation} tasks={tasks} setTasks={setTasks} />;
}
