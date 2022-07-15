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
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { tasks, setTasks } = React.useContext(TasksContext);
  const navigation = useNavigation();
  const getCompletedTasks = (): TaskModel[] => {
    return tasks.filter((task: TaskModel) => task.completed === true);
  };

  const getActiveTasks = (): TaskModel[] => {
    return tasks.filter((task: TaskModel) => task.completed === false);
  };

  return (
    <View style={global.container}>
      <View style={global.header}>
        <Text style={global.title}>Active Tasks</Text>
        {/* <View>
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
        </View> */}
      </View>
      <ScrollView>
        <View>
          {getActiveTasks().length > 0 && getActiveTasks() !== undefined ? (
            <View>
              {getActiveTasks().map((task: TaskModel) => (
                <View key={task?.id}>
                  <Task task={task} />
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
  },
  icon: {
    marginHorizontal: 10,
  },
});
