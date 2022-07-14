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
import LongPressModal from '../Modal/LongPressModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface HomeProps {
  navigation: any;
  tasks: Array<TaskModel>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskModel>>>;
  completedTasks: Array<TaskModel>;
}

export default function Home({
  navigation,
  tasks,
  setTasks,
  completedTasks,
}: HomeProps) {
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const [selectFavorites, setSelectFavorites] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [longPress, setLongPress] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Array<TaskModel>>([]);
  const handleLongPress = () => {
    setShowModal(true);
    if (selectAll) {
      setSelectFavorites(false);
      setSelected(tasks);
      // setShowModal(false);
    }
    if (selectFavorites) {
      setSelectAll(false);
      setSelected(tasks.filter(task => task.favorite));
      // setShowModal(false);
    }
  };
  React.useEffect(() => {
    if (longPress) {
      handleLongPress();
      // setShowModal(false);
    }
    setLongPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longPress]);
  return (
    <View style={global.container}>
      <View style={global.header}>
        <Text style={global.title}>Active Tasks</Text>
        <View>
          {selected && selected.length > 0 ? (
            <View style={styles.icons}>
              <TouchableHighlight>
                <MaterialIcons
                  style={styles.icon}
                  name="delete-outline"
                  size={30}
                  color="black"
                />
              </TouchableHighlight>
              <TouchableHighlight>
                <MaterialIcons
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
      <ScrollView>
        <View>
          {tasks.length > 0 && tasks !== undefined ? (
            <View>
              {tasks.map((task: TaskModel) => (
                <View key={task?.id}>
                  <Task
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    navigation={navigation}
                    // setLongPress={setLongPress}
                    // selected={selected}
                    // selectAll={selectAll}
                    // selectFavorites={selectFavorites}
                    // setSelectAll={setSelectAll}
                    // setSelectFavorites={setSelectFavorites}
                  />
                </View>
              ))}
            </View>
          ) : (
            <NoTasks />
          )}
        </View>
        <View style={global.header}>
          <Text style={global.title}>Completed Tasks</Text>
        </View>
        <View>
          {completedTasks.length > 0 && completedTasks !== undefined ? (
            <View>
              {completedTasks.map((task: TaskModel) => (
                <View key={task.id}>
                  <Task
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    navigation={navigation}
                    completed={true}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <LongPressModal
        setSelectAll={setSelectAll}
        setSelectFavorites={setSelectFavorites}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
});
