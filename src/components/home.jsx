import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import TaskList from './taskList';
import backgroundImage from '../image2.jpg';

const Home = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}  resizeMode="cover">
     <View style={styles.container}>
       <Text style={styles.text}>welcome</Text>
       <Button
          title="my Task List" // טקסט הכפתור
          onPress={() => navigation.navigate('TaskList')} // ניווט לעמוד רשימת המשימות
        />
      
     </View>
   </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    background: {
      flex: 1, // מאפשר לתמונה למלא את כל שטח המסך
      justifyContent: 'center', // מרכז את התוכן
      alignItems: 'center', // מרכז את התוכן
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'black', // צבע הטקסט, ניתן לשנות לפי הצורך
      fontSize: 70,
    },

  });
