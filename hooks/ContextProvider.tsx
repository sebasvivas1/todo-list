/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import TaskModel from '../models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface TasksContextProviderProps {
  children: React.ReactNode;
}
export const TasksContext = React.createContext<any>([]);
export default function ContextProvider({
  children,
}: TasksContextProviderProps) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);

  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      setTasks(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(tasks));
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getDataFromStorage();
  }, []);

  React.useEffect(() => {
    saveData();
  }, [tasks]);
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
