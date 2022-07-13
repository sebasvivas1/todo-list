import React from 'react';
import Favorites from '../components/Tasks/Favorites';
import TaskModel from '../models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen({ navigation }: any) {
  const [favoriteTasks, setFavoriteTasks] = React.useState<Array<TaskModel>>(
    [],
  );
  const [allTasks, setAllTasks] = React.useState<Array<TaskModel>>([]);
  const getFavorites = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@storage_Key');
      if (storedTasks !== null) {
        const tasks: TaskModel[] = JSON.parse(storedTasks);
        const favorites = tasks.filter(task => task.favorite);
        setFavoriteTasks(favorites);
        const alltasks = tasks;
        setAllTasks(alltasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getFavorites();
  }, []);
  return (
    <Favorites
      favorites={favoriteTasks}
      allTasks={allTasks}
      setAllTasks={setAllTasks}
      navigation={navigation}
    />
  );
}
