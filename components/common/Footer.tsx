import { View, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface FooterProps {
  navigation: any;
}

export default function Footer({ navigation }: FooterProps) {
  return (
    <View style={styles.footer}>
      <TouchableHighlight
        onPress={() => navigation.navigate('Home')}
        underlayColor={'#558DED'}>
        <FontAwesome5 name="tasks" style={styles.icons} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => navigation.navigate('New Task')}
        underlayColor={'#558DED'}>
        <AntDesign name="pluscircleo" style={styles.plusCircle} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => navigation.navigate('Favorites')}
        underlayColor={'#558DED'}>
        <FontAwesome5 name="heart" style={styles.icons} solid />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#558DED',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
  },
  icons: {
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 30,
  },
  plusCircle: {
    color: '#fff',
    fontSize: 40,
  },
});
