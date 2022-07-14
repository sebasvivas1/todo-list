import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FavoritesScreen,
  HomeScreen,
  NewTaskScreen,
  TaskDetailsScreen,
  UpdateTaskScreen,
} from './screens';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Details" component={TaskDetailsScreen} />
        <Stack.Screen name="Update Task" component={UpdateTaskScreen} />
        <Stack.Screen name="New Task" component={NewTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
