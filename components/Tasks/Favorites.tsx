import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Task from './Task';
import global from '../../styles/global';
import NoTasks from '../common/NoTasks';
import Footer from '../common/Footer';

interface FavoritesProps {
  favorites: Array<TaskModel>;
  setFavorites: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  allTasks: Array<TaskModel>;
  setAllTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  navigation: any;
}

export default function Favorites({
  favorites,
  setFavorites,
  navigation,
}: FavoritesProps) {
  // const [, setLongPress] = React.useState(false);
  return (
    <View style={global.container}>
      <Text style={global.title}>Favorite Tasks</Text>
      <ScrollView>
        <View>
          {favorites.length > 0 && favorites !== undefined ? (
            <View>
              {favorites.map((task: TaskModel) => (
                <View key={task?.id}>
                  <Task
                    task={task}
                    tasks={favorites}
                    setTasks={setFavorites}
                    navigation={navigation}
                    // setLongPress={setLongPress}
                  />
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
