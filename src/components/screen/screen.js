import React from "react";
import { View } from "react-native";
import Home from "../home/Home";
import Bottom from "../bottom/Bottom";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Screen() {
  return (
    <View style={styles.screenCon}>
      <Home />
    </View>
  );
}
const styles = StyleSheet.create({
  screenCon: {
    flex: 1,
    justifyContent: "space-between",
  },
});
