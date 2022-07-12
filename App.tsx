import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
// import { faker } from '@faker-js/faker';
import Tasks from './components/Tasks/Task';
import TaskModel from './models/Task';
import NewTask from './components/Tasks/NewTask';
import Footer from './components/common/Footer';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function App() {
  const [tasks, setTasks] = React.useState<Array<TaskModel>>([
    {
      id: 'asdk81273981237',
      title: 'First Task',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe repudiandae, aspernatur tempora eveniet, iusto perferendis, qui neque laboriosam exercitationem natus recusandae soluta! Quod, aut nesciunt! Similique cumque dicta iure magnam rem. Esse, incidunt nesciunt laudantium soluta rerum commodi porro optio ratione voluptas amet iure expedita enim quod cupiditate id distinctio? Et soluta dolore dignissimos rerum fugiat animi reiciendis consequatur doloribus deleniti, sit debitis amet illo quo ullam natus est repellat?',
      priority: 0,
      status: 0,
      favorite: false,
      createdAt: new Date(),
    },
    {
      id: 'asdk81difdfkldf',
      title: 'Second Task',
      description: 'Task Description',
      priority: 1,
      status: 0,
      favorite: false,
      createdAt: new Date(),
    },
    {
      id: 'asdk81difdfkldfklasjdkflj',
      title: 'Third Critical Task',
      description: 'Task Description',
      priority: 2,
      status: 0,
      favorite: false,
      createdAt: new Date(),
    },
  ]);
  const [showModal, setShowModal] = React.useState(false);
  const toggleFavorite = (task: TaskModel) => {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasks[index].favorite = !tasks[index].favorite;
      setTasks([...tasks]);
      console.log(task);
    }
  };
  const deleteTask = (task: TaskModel) => {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasks.splice(index, 1);
      setTasks([...tasks]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Tasks</Text>
      <SwipeListView
        data={tasks}
        renderItem={data => (
          <View>
            <Tasks task={data.item} tasks={tasks} setTasks={setTasks} />
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
        tasks={tasks}
        setTasks={setTasks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingTop: 80,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
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
