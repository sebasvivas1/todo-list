import { View } from 'react-native';
import React from 'react';
import UpdateTask from '../components/UpdateTask/UpdateTask';

export default function UpdateTaskScreen({ route }: any) {
  return (
    <View>
      <UpdateTask route={route} />
    </View>
  );
}
