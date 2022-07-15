// import { View } from 'react-native';
import React from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskModel from '../models/Task';
interface TasksContextProviderProps {
  children: React.ReactNode;
}
export const TasksContext = React.createContext<any>([]);
export default function ContextProvider({
  children,
}: TasksContextProviderProps) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
