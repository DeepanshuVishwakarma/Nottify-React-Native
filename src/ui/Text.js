import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import colors from "../../styles/colors";
export default function Txt({ text, style }) {
  return <Text style={styles.text}>{text}</Text>;
}
const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
});
