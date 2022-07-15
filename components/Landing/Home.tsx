import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import React from 'react';
import TaskModel from '../../models/Task';
import Task from '../Tasks/Task';
import Footer from '../common/Footer';
import global from '../../styles/global';
import NoTasks from '../common/NoTasks';
import { TasksContext } from '../../hooks/ContextProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
  const { tasks, setTasks } = React.useContext(TasksContext);
  const [sortBy, setSortBy] = React.useState(false);
  const [selectFavorites, setSelectFavorites] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Array<TaskModel>>([]);
  const [startSelection, setStartSelection] = React.useState<boolean>(false);

  const getCompletedTasks = (): TaskModel[] => {
    return tasks.filter((task: TaskModel) => task.completed === true);
  };

  const getActiveTasks = (): TaskModel[] => {
    return tasks.filter((task: TaskModel) => task.completed === false);
  };

  const sortTasks = () => {
    if (sortBy) {
      const sorted = tasks
        .sort((a: TaskModel, b: TaskModel) => {
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        .reverse();
      setTasks(sorted);
      setSortBy(false);
    } else if (!sortBy) {
      const sorted = tasks.sort((a: TaskModel, b: TaskModel) => {
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      setTasks(sorted);
      setSortBy(true);
    }
  };

  const deleteSelectedTasks = () => {
    const oldTasks = [...tasks];
    setTasks(oldTasks.filter((task: TaskModel) => !selected.includes(task)));
    setSelected([]);
    setStartSelection(false);
    setSelectFavorites(false);
  };

  const markSelectedTasksAsDone = () => {
    const oldTasks = [...tasks];
    setTasks(
      oldTasks.map((task: TaskModel) => {
        if (selected.includes(task)) {
          return { ...task, completed: true, favorite: false };
        }
        return task;
      }),
    );
    setSelected([]);
    setStartSelection(false);
    setSelectFavorites(false);
  };

  React.useEffect(() => {
    if (selectFavorites) {
      setSelected(tasks.filter((task: TaskModel) => task.favorite === true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFavorites]);

  return (
    <View style={global.container}>
      <View style={global.header}>
        <Text style={global.title}>Active Tasks</Text>
        {!selectFavorites ? (
          <View style={styles.sortContainer}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => sortTasks()}>
              <FontAwesome
                name="sort"
                size={25}
                color="#000"
                style={styles.icon}
              />
            </TouchableHighlight>
            <Text style={styles.sortText}>{sortBy}</Text>
          </View>
        ) : null}
        <View>
          {(selectFavorites && selected.length > 0) ||
          (startSelection && selected.length > 0) ? (
            <View style={styles.icons}>
              <TouchableHighlight onPress={deleteSelectedTasks}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="delete-outline"
                  size={30}
                  color="black"
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={markSelectedTasksAsDone}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="check"
                  size={30}
                  color="black"
                />
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
      </View>
      <ScrollView alwaysBounceVertical={false}>
        <View>
          {getActiveTasks().length > 0 && getActiveTasks() !== undefined ? (
            <View>
              {getActiveTasks().map((task: TaskModel) => (
                <View key={task?.id}>
                  <Task
                    task={task}
                    setSelectFavorites={setSelectFavorites}
                    selected={selected}
                    setSelected={setSelected}
                    startSelection={startSelection}
                    setStartSelection={setStartSelection}
                  />
                </View>
              ))}
            </View>
          ) : (
            <NoTasks />
          )}
        </View>
        {selectFavorites && selected.length > 0 ? (
          <TouchableHighlight
            underlayColor={'#dedede'}
            onPress={() => {
              setSelected([]);
              setSelectFavorites(false);
            }}
            style={styles.unselectContainer}>
            <Text style={styles.unselectText}>Unselect All</Text>
          </TouchableHighlight>
        ) : null}
        <View style={global.header}>
          <Text style={global.title}>Completed Tasks</Text>
        </View>
        <View>
          <View>
            {getCompletedTasks().map((task: TaskModel) => (
              <View key={task.id}>
                <Task task={task} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    marginHorizontal: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginRight: 20,
  },
  unselectContainer: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: global.blue.color,
    borderRadius: 10,
  },
  unselectText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
