import { View, Text, Modal, StyleSheet } from 'react-native';
import React from 'react';
import global from '../../styles/global';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableHighlight } from 'react-native';

interface LongPressModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectFavorites?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LongPressModal({
  showModal,
  setShowModal,
  setSelectFavorites,
}: LongPressModalProps) {
  return (
    <Modal visible={showModal} transparent animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.container}>
            <Text style={styles.title}>Long Press Actions</Text>
            <SimpleLineIcons
              name="close"
              size={20}
              color="#fff"
              onPress={() => setShowModal(false)}
            />
          </View>
          <View style={styles.optionsContainer}>
            <TouchableHighlight
              onPress={() => {
                if (setSelectFavorites !== undefined) {
                  setSelectFavorites(true);
                  setShowModal(false);
                }
              }}
              style={styles.options}>
              <Text style={styles.optionsText}>Select All Favorites</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.blue.color,
    height: 60,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 20,
  },
  options: {
    backgroundColor: global.blue.color,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    height: '100%',
  },
  optionsText: {
    fontSize: 14,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '140%',
  },
  modalView: {
    margin: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
