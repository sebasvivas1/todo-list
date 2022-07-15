import { View } from 'react-native';
import React from 'react';
import Details from '../components/Tasks/Details';

export default function TaskDetailsScreen({ route }: any) {
  const task = route.params.newTask;
  return (
    <View>
      <Details task={task} />
    </View>
  );
}
