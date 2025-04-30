import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/components/home';
import { useState } from 'react';
import Splash from './src/components/splash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import TaskList from './src/components/taskList';


export default function App() {
  const Stack = createStackNavigator();
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {isSplashVisible ? (
          <Splash onFinish={handleSplashFinish} /> // הראה את מסך ה-Splash
        ) : (
          <NavigationContainer >
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="TaskList" component={TaskList} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
        <Text>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    Ruth & Michal    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

