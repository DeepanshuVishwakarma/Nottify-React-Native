import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"; // Import TouchableOpacity
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";

export default function Intro() {
  const navigation = useNavigation();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const delayNavigation = setTimeout(() => {
      navigation.navigate("Slides");

      setFlag(true);
    }, 3000);

    return () => clearTimeout(delayNavigation);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nottify</Text>
      <View style={styles.buttonContainer}>
        {flag && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Slides")}
          >
            <Text style={styles.buttonText}>Go to slides</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.bgColor,
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30, // Adjust the distance from the bottom as needed
    right: 30, // Adjust the distance from the right as needed
  },
  button: {
    backgroundColor: colors.pColor, // Define your button's background color
    padding: 10,
    borderRadius: 5,
    // backgroundColor: colors.pColor,
  },
  buttonText: {
    // color: "white",
    fontSize: 16,
  },
});
