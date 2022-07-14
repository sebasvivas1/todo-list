import { View } from 'react-native';
import React from 'react';
import UpdateTask from '../components/UpdateTask/UpdateTask';
import TaskModel from '../models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateTaskScreen({ route, navigation }: any) {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    if (jsonValue !== null) {
      const parsedTasks = JSON.parse(jsonValue);
      setTasks(parsedTasks);
    }
  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <UpdateTask
        route={route}
        navigation={navigation}
        tasks={tasks}
        setTasks={setTasks}
      />
    </View>
  );
}
