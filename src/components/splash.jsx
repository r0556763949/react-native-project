// src/components/Splash.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Splash = ({ onFinish }) => {
  useEffect(() => {
    // מחכה 2 שניות ואז מעביר למסך הבית
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer); // מנקה את הטיימר אם הקומפוננטה מתפרקת
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text>Welcome to My ToDoList!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
