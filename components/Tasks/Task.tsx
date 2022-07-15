import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  // Alert,
} from 'react-native';
import TaskModel from '../../models/Task';
import TaskInfo from './TaskInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../styles/global';
import { TasksContext } from '../../hooks/ContextProvider';
import LongPressModal from '../Modal/LongPressModal';

interface TaskProps {
  task: TaskModel;
  setSelectFavorites?: React.Dispatch<React.SetStateAction<boolean>>;
  selected?: Array<TaskModel>;
  selectFavorites?: boolean;
}

export default function Task({
  task,
  setSelectFavorites,
  selectFavorites,
  selected,
}: TaskProps) {
  const { tasks, setTasks } = React.useContext(TasksContext);
  const [favorite, setFavorite] = React.useState(task?.favorite);
  const [showTask, setShowTask] = React.useState(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  const toggleModal = () => {
    setShowTask(!showTask);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    const index = tasks.findIndex((t: TaskModel) => t.id === task.id);
    tasks[index].favorite = !tasks[index].favorite;
    setTasks([...tasks]);
  };

  const deleteTask = () => {
    const index = tasks.findIndex((t: TaskModel) => t.id === task.id);
    const oldTasks = [...tasks];
    oldTasks.splice(index, 1);
    setTasks(oldTasks);
  };

  const checkIfSelected = () => {
    if (selected !== undefined) {
      const id = task.id;
      if (selected.map((t: TaskModel) => t.id).includes(id)) {
        setIsSelected(true);
        console.log('should turn blue');
      } else {
        setIsSelected(false);
      }
    }
  };

  React.useEffect(() => {
    checkIfSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFavorites]);

  return (
    <Pressable
      onPress={toggleModal}
      style={isSelected ? styles.selectedContainer : styles.container}
      onLongPress={() => setShowModal(true)}>
      <View style={styles.items}>
        <Text
          numberOfLines={1}
          style={isSelected ? styles.selectedText : styles.text}>
          {task?.title || 'Task Name'}
        </Text>
        <View>
          {!task?.completed ? (
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
        <TaskInfo task={task} showTask={showTask} setShowTask={setShowTask} />
      </View>
      <LongPressModal
        setSelectFavorites={setSelectFavorites}
        setShowModal={setShowModal}
        showModal={showModal}
      />
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
