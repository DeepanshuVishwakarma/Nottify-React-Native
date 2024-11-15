import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import store from "./src/store/store";
import Slides from "./src/components/slides/slides";
import Intro from "./src/components/Intro";
import Screen from "./src/components/screen/screen";
import SingleTask from "./src/components/single-task/SingleTask";
const Stack = createStackNavigator();

export default function EntryPoint() {
  const slide = useSelector((state) => state.app.slide); // Accessing redux state

  return (
    <SafeAreaView style={styles.container}>
      {/* {/* <NavigationContainer> giving error that two navigation are inside of each other */}
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Slides" component={Slides} />
        <Stack.Screen name="Screen" component={Screen} />
        <Stack.Screen name="SingleTask" component={SingleTask} />
        {/* Uncomment this line when ready to use */}
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
