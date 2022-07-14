import { View, Image, StyleSheet, Text } from 'react-native';
import React from 'react';

export default function NoTasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have no tasks</Text>
      <Image
        style={styles.image}
        source={require('../../assets/notasks.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: '#558DED',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
