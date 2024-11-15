import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setSlide } from "../../store/reducers/slice";
import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import Txt from "../../ui/Text";
import { SvgUri } from "react-native-svg";

export default function Slides() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const slide = useSelector((state) => state.app.slide);
  const data = [
    {
      title: "Manage your tasks",
      description:
        "You can easily manage all of your daily tasks in Nottify for free",
      svg: "SVG_DATA_1", // Replace with your SVG data
    },
    {
      title: "Create a daily routine",
      description:
        "In Nottify, you can create your personalized routine to stay productive",
      svg: "SVG_DATA_2", // Replace with your SVG data
    },
    {
      title: "Organize your tasks",
      description:
        "You can organize your daily tasks by adding them to separate categories",
      svg: "SVG_DATA_3", // Replace with your SVG data
    },
  ];

  const handleBack = () => {
    if (slide === 0) {
      navigation.navigate("Intro");
    } else {
      const num = slide - 1;
      dispatch(setSlide(num));
    }
  };

  const handleNext = () => {
    if (slide === 2) {
      navigation.navigate("Screen");
    } else {
      const num = slide + 1;
      dispatch(setSlide(num));
    }
  };

  // Destructure the data properly
  const {
    title: slideTitle,
    description,
    svg,
  } = slide >= 0 && slide < data.length ? data[slide] : {};

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          columnGap: 50,
          rowGap: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Txt text={`slide ${slide}`} />
        {/* <SvgUri
          width="200" // Adjust the width as needed
          height="200" // Adjust the height as needed
          uri={require("../../ui/stickers/ManageTask.svg")}
        /> */}
        <View style={styles.carosel}>
          {data.map((_, index) => (
            <View
              key={index}
              style={index === slide ? styles.dotActive : styles.dot}
            />
          ))}
        </View>
        <Text style={styles.title}>{slideTitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {/* You can use the `svg` variable here */}
      {/* <SvgComponent svgData={svg} /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.back]}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.next]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 30,
  },

  back: {
    color: colors.white,
  },
  next: {
    backgroundColor: colors.pColor,
    color: colors.white,
    paddingHorizontal: 24,
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  description: {
    fontSize: 12,
    color: "#f0f0f0",
    paddingHorizontal: 30,
    alignItems: "center",
    top: -15,
  },
  carosel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    margin: 4,
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 4,
  },
});
