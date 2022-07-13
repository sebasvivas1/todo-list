import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import { SwipeListView } from 'react-native-swipe-list-view';
import Task from '../Tasks/Task';
import Footer from '../common/Footer';
import NewTask from '../Tasks/NewTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global';

interface HomeProps {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([]);

  const toggleFavorite = (task: TaskModel) => {
    if (tasks !== undefined) {
      const index = tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        tasks[index].favorite = !tasks[index].favorite;
        setTasks([...tasks]);
        updateTask();
      }
    }
  };
  const deleteTask = (task: TaskModel) => {
    if (tasks !== undefined) {
      const index = tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        tasks.splice(index, 1);
        setTasks([...tasks]);
        updateTask();
      }
    }
  };

  const updateTask = async () => {
    if (tasks !== undefined) {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(tasks));
    }
  };
  const getData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@storage_Key');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
        // console.log(storedTasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={global.container}>
      <View style={global.header}>
        <Text style={global.title}>Active Tasks</Text>
        <TouchableHighlight
          onPress={() => navigation.navigate('Favorites')}
          underlayColor={'#fff'}>
          <Text style={styles.favoriteTitle}>Favorites</Text>
        </TouchableHighlight>
      </View>
      <SwipeListView
        data={tasks}
        renderItem={data => (
          <View>
            <Task
              task={data.item}
              tasks={tasks || []}
              setTasks={setTasks}
              navigation={navigation}
            />
          </View>
        )}
        renderHiddenItem={data => (
          <View style={styles.rowMap}>
            <View>
              <TouchableHighlight onPress={() => deleteTask(data.item)}>
                <Text>Delete</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight onPress={() => toggleFavorite(data.item)}>
                <Text>Fav</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => Alert.alert('Done')}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
        leftOpenValue={90}
        rightOpenValue={-90}
      />
      <Footer showModal={showModal} setShowModal={setShowModal} />
      <NewTask
        setShowModal={setShowModal}
        showModal={showModal}
        tasks={tasks || []}
        setTasks={setTasks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteTitle: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    color: 'red',
  },
  tasksWrapper: {
    padding: 20,
  },
  items: {
    padding: 20,
  },
  rowMap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 40,
    height: 70,
    borderRadius: 10,
    padding: 20,
  },
});
