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
import global from '../../styles/global';
import { TasksContext } from '../../hooks/ContextProvider';
import LongPressModal from '../Modal/LongPressModal';

interface TaskProps {
  task: TaskModel;
  setSelectFavorites?: React.Dispatch<React.SetStateAction<boolean>>;
  selected?: Array<TaskModel>;
  setSelected?: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  startSelection?: boolean;
  setStartSelection?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Task({
  task,
  setSelectFavorites,
  selected,
  setSelected,
  startSelection,
  setStartSelection,
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
      } else {
        setIsSelected(false);
      }
    }
  };

  const handleLongPress = () => {
    if (task.favorite) {
      setShowModal(true);
    } else {
      if (
        setStartSelection !== undefined &&
        selected !== undefined &&
        setSelected
      ) {
        setStartSelection(true);
        const oldTasks = [...selected];
        setSelected([...oldTasks, task]);
      }
    }
  };

  const handleOnPress = () => {
    if (startSelection) {
      if (
        selected !== undefined &&
        setSelected &&
        setStartSelection !== undefined
      ) {
        const oldTasks = [...selected];
        if (selected.includes(task)) {
          const index = selected.findIndex((t: TaskModel) => t.id === task.id);
          oldTasks.splice(index, 1);
          setSelected(oldTasks);
          if (selected.length === 1) {
            setStartSelection(false);
          }
        } else {
          setSelected([...oldTasks, task]);
        }
        if (selected.length === 0) {
          setStartSelection(false);
          toggleModal();
        }
      }
    } else {
      toggleModal();
    }
  };

  React.useEffect(() => {
    checkIfSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Pressable
      onPress={handleOnPress}
      style={isSelected ? styles.selectedContainer : styles.container}
      onLongPress={handleLongPress}>
      <View style={styles.items}>
        <Text
          numberOfLines={1}
          style={isSelected ? styles.selectedText : styles.text}>
          {task?.title || 'Task Name'}
        </Text>
        <View>
          {!task?.completed ? (
            <View style={styles.itemsRight}>
              {task.priority === 0 ? (
                <MaterialIcons
                  name="priority-high"
                  size={23}
                  color="green"
                  style={styles.priority}
                />
              ) : null}
              {task.priority === 1 ? (
                <MaterialIcons
                  name="priority-high"
                  size={23}
                  color="orange"
                  style={styles.priority}
                />
              ) : null}
              {task.priority === 2 ? (
                <MaterialIcons
                  name="priority-high"
                  size={23}
                  color="red"
                  style={styles.priority}
                />
              ) : null}
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
    marginRight: 10,
  },
  priority: {
    marginRight: 10,
  },
});
