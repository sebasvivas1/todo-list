import { View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskModel from '../models/Task';

export const TasksContext = React.createContext<any>([]);
export default function ContextProvider({ children }: any) {
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
  return (
    <View>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        {children}
      </TasksContext.Provider>
    </View>
  );
}
