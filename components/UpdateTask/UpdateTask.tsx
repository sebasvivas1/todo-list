import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import global from '../../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import Footer from '../common/Footer';
import { useNavigation } from '@react-navigation/native';
import { TasksContext } from '../../hooks/ContextProvider';

interface UpdateTaskProps {
  route: any;
}

export default function UpdateTask({ route }: UpdateTaskProps) {
  const { tasks, setTasks } = React.useContext(TasksContext);
  const navigation = useNavigation();
  const [task] = React.useState<TaskModel>(route.params.task);
  const [title, setTitle] = React.useState<string>(task?.title);
  const [description, setDescription] = React.useState<string>(
    task?.description,
  );
  const [priority] = React.useState<number>(task?.priority);
  const [newPriority, setNewPriority] = React.useState<number>(task?.priority);
  const id = task.id;

  const refactorPriority = () => {
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'High';
      case 2:
        return 'Critical';
      default:
        return 'Low';
    }
  };

  const updateTask = async () => {
    try {
      const newTask: TaskModel = {
        id,
        title,
        description,
        priority: newPriority,
        completed: false,
        favorite: task.favorite,
        createdAt: task.createdAt,
      };
      const index = tasks.findIndex(t => t.id === id);
      const copy = [...tasks];
      copy[index] = newTask;
      setTasks([...copy]);
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(copy)).then(
        () => navigation.navigate('Details', { newTask }),
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={global.title}>Update Task</Text>
      <ScrollView>
        <View style={styles.sections}>
          <Text style={styles.text}>Title: </Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={text => setTitle(text)}
            value={title}
          />
        </View>
        <View style={styles.sections}>
          <Text style={styles.text}>Description: </Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={text => setDescription(text)}
            value={description}
          />
        </View>
        <View style={styles.selector}>
          <Text style={styles.text}>
            Current Priority: {refactorPriority()}
          </Text>
          <RNPickerSelect
            style={{ ...pickerSelectStyles }}
            onValueChange={value => setNewPriority(value)}
            items={[
              { label: 'Low Priority', value: 0 },
              { label: 'High Priority', value: 1 },
              { label: 'Critical Priority', value: 2 },
            ]}
          />
        </View>
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.button}
          onPress={() => updateTask()}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableHighlight>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  sections: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 14,
  },
  input: {
    textDecorationLine: 'underline',
    fontSize: 17,
    marginLeft: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
    wrapContent: 'wrap',
    paddingRight: 20,
    width: '70%',
  },
  selector: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  button: {
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: global.blue.color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
