import { View } from 'react-native';
import React from 'react';
import Details from '../components/Tasks/Details';

export default function TaskDetailsScreen({ navigation, route }: any) {
  const task = route.params.newTask;
  return (
    <View>
      <Details task={task} navigation={navigation} />
    </View>
  );
}
