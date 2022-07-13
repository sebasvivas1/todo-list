import { View, Text, FlatList } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Task from './Task';
import global from '../../styles/global';

interface FavoritesProps {
  favorites: Array<TaskModel>;
  allTasks: Array<TaskModel>;
  setAllTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
}

export default function Favorites({
  favorites,
  allTasks,
  setAllTasks,
}: FavoritesProps) {
  return (
    <View style={global.container}>
      <Text style={global.title}>Favorite Tasks</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Task task={item} tasks={allTasks} setTasks={setAllTasks} />
        )}
      />
    </View>
  );
}
