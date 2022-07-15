import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import TaskModel from '../../models/Task';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global';
import Footer from '../common/Footer';
import { TouchableHighlight } from 'react-native';

interface NewTaskProps {
  tasks: Array<TaskModel>;
  setTasks: any;
  navigation: any;
}

export default function NewTask({ tasks, setTasks, navigation }: NewTaskProps) {
  const [taskName, setTaskName] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskPriority, setTaskPriority] = React.useState<number>();
  const [done, setDone] = React.useState<boolean>(false);
  const [underlay, setUnderlay] = React.useState<boolean>(false);
  const addTask = async () => {
    if (
      (taskName.length > 0 &&
        taskDescription.length > 0 &&
        taskPriority === 0) ||
      taskPriority === 1 ||
      taskPriority === 2
    ) {
      try {
        const task: TaskModel = {
          id: faker.database.mongodbObjectId(),
          title: taskName,
          description: taskDescription,
          priority: taskPriority,
          status: 0,
          favorite: false,
          createdAt: new Date(),
        };
        setTasks([...tasks, task]);
        setDone(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  const saveData = async (tasksArr: TaskModel[]) => {
    try {
      const jsonValue = JSON.stringify(tasksArr);
      await AsyncStorage.setItem('@storage_Key', jsonValue).then(() =>
        navigation.navigate('Home'),
      );
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (done) {
      saveData(tasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, tasks]);
  return (
    <View style={global.container}>
      <ScrollView>
        <Text style={global.title}>Add Task</Text>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          onChange={e => setTaskName(e.nativeEvent.text)}
        />
        <Text style={styles.text}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Description"
          onChange={e => setTaskDescription(e.nativeEvent.text)}
        />
        <Text style={styles.text}>Task Priority</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ ...pickerSelectStyles }}
            onValueChange={value => setTaskPriority(value)}
            items={[
              { label: 'Low Priority', value: 0 },
              { label: 'High Priority', value: 1 },
              { label: 'Critical Priority', value: 2 },
            ]}
          />
        </View>
        <TouchableHighlight
          onPress={addTask}
          style={styles.buttonContainer}
          underlayColor={'#dedede'}
          onShowUnderlay={() => setUnderlay(true)}
          onHideUnderlay={() => setUnderlay(false)}>
          <Text style={underlay ? styles.buttonUnderlay : styles.button}>
            Create Task!
          </Text>
        </TouchableHighlight>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  pickerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: global.blue.color,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#dedede',
  },
  button: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  buttonUnderlay: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: global.blue.color,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
