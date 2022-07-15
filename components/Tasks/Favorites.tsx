import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Task from './Task';
import global from '../../styles/global';
import Footer from '../common/Footer';
import { TasksContext } from '../../hooks/ContextProvider';
import NoTasks from '../common/NoTasks';

export default function Favorites() {
  const { tasks } = React.useContext(TasksContext);
  const getFavorites = (): TaskModel[] => {
    return tasks.filter((task: TaskModel) => task.favorite === true);
  };
  return (
    <View style={global.container}>
      <Text style={global.title}>Favorite Tasks</Text>
      <ScrollView>
        {getFavorites().length > 0 && getFavorites() !== undefined ? (
          <View>
            {getFavorites().map((task: TaskModel) => (
              <View key={task?.id}>
                <Task task={task} />
              </View>
            ))}
          </View>
        ) : (
          <NoTasks />
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}
