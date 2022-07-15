import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  Alert,
} from 'react-native';
import TaskModel from '../../models/Task';
import TaskInfo from './TaskInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global';

interface TaskProps {
  task: TaskModel;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  navigation?: any;
  completed?: boolean;
  setAllTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  allTasks: Array<TaskModel>;
  // setLongPress: React.Dispatch<React.SetStateAction<boolean>>;
  // selected?: Array<TaskModel>;
  // selectAll?: boolean;
  // selectFavorites?: boolean;
  // setSelectAll?: React.Dispatch<React.SetStateAction<boolean>>;
  // setSelectFavorites?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Task({
  task,
  // tasks,
  setTasks,
  navigation,
  completed = false,
  setAllTasks,
  allTasks,
}: // setLongPress,
// selected,
TaskProps) {
  const [favorite, setFavorite] = React.useState(task?.favorite);
  const [showTask, setShowTask] = React.useState(false);
  const [isSelected /*setIsSelected*/] = React.useState(false);

  const toggleFavorite = async () => {
    setFavorite(!favorite);
    const index = allTasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      const copy = [...allTasks];
      copy[index].favorite = !copy[index].favorite;
      setAllTasks([...copy]);
      setTasks([...copy]);
      const jsonValue = JSON.stringify(allTasks);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    }
  };

  const deleteTask = () => {
    Alert.alert('Delete', 'Do you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const index = allTasks.findIndex(t => t.id === task.id);
          if (index > -1) {
            const copy = [...allTasks];
            allTasks.splice(index, 1);
            setAllTasks([...copy]);
          }
        },
      },
    ]);
  };

  const toggleModal = () => {
    setShowTask(!showTask);
  };
  return (
    <Pressable
      onPress={toggleModal}
      style={isSelected ? styles.selectedContainer : styles.container}
      // onLongPress={() => setLongPress(true)}
    >
      <View style={styles.items}>
        <Text
          numberOfLines={1}
          style={isSelected ? styles.selectedText : styles.text}>
          {task?.title || 'Task Name'}
        </Text>
        <View>
          {!completed ? (
            <View style={styles.itemsRight}>
              <TouchableHighlight
                onPress={toggleFavorite}
                underlayColor="#f2f2f2"
                style={styles.favorite}>
                {favorite ? (
                  <MaterialIcons name="favorite" size={30} color="red" />
                ) : (
                  <MaterialIcons name="favorite-border" size={30} />
                )}
              </TouchableHighlight>
              <TouchableHighlight onPress={deleteTask} underlayColor="#f2f2f2">
                <MaterialIcons name="delete-outline" size={30} color="black" />
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.info}>
        <TaskInfo
          task={task}
          showTask={showTask}
          tasks={allTasks}
          setTasks={setAllTasks}
          setShowTask={setShowTask}
          navigation={navigation}
          completed={completed}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    fontSize: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 10,
  },
  selectedContainer: {
    backgroundColor: global.blue.color,
    borderWidth: 0.5,
    borderColor: '#000',
    fontSize: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 10,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    width: '70%',
  },
  selectedText: {
    fontWeight: '400',
    fontSize: 18,
    width: '70%',
    color: '#fff',
  },
  itemsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    position: 'absolute',
    zIndex: 999,
  },
  favorite: {
    marginRight: 15,
  },
});
