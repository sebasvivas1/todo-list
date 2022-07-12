import { View, Button, StyleSheet } from 'react-native';
import React from 'react';

interface FooterProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

export default function Footer({ showModal, setShowModal }: FooterProps) {
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <View style={styles.footer}>
      <Button title="Add Task" onPress={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    padding: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
