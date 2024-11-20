// import { Button } from "@mui/material";
// import React from "react";
// import { Text } from "react-native";
// import { View } from "react-native";
// import Icon from "react-native-vector-icons/EvilIcons";

// export default function TaskOpdtions({ icon, title, component }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.iconTitleContainer}>
//         <Icon name={icon} size={30} color={colors.white} />
//         <Text style={styles.title}>{title} :</Text>
//       </View>
//       <Button style={styles.button}>
//         <Text>button</Text>
//       </Button>
//     </View>
//   );
// }

// const styles = {
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 70,
//   },
//   iconTitleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   title: {
//     marginLeft: 10, // Add margin between the icon and the title
//   },
//   button: {
//     // Add any specific styles for the button here
//   },
// };

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // You can use other icon libraries as well
import { addTask } from "../store/reducers/slice";
import { useDispatch } from "react-redux";

// List of Categories
const taskCategories = [
  {
    taskFor: "Grocery",
    taskBg: "#a3e635",
    taskIcon: "bread-slice-outline",
    iconColor: "#222",
  },
  {
    taskFor: "Work",
    taskBg: "#f87171",
    taskIcon: "briefcase-outline",
    iconColor: "#222",
  },
  {
    taskFor: "Sport",
    taskBg: "#67e8f9",
    taskIcon: "dumbbell",
    iconColor: "#222",
  },
  {
    taskFor: "Design",
    taskBg: "#4ade80",
    taskIcon: "palette-outline",
    iconColor: "#222",
  },
  {
    taskFor: "University",
    taskBg: "#60a5fa",
    taskIcon: "school-outline",
    iconColor: "#222",
  },
  {
    taskFor: "Social",
    taskBg: "#f472b6",
    taskIcon: "bullhorn-outline",
    iconColor: "#222",
  },
  {
    taskFor: "Music",
    taskBg: "#e879f9",
    taskIcon: "music-note-outline",
    iconColor: "#222",
  },
  {
    taskFor: "Health",
    taskBg: "#34d399",
    taskIcon: "heart-outline",
    iconColor: "#222",
  },
  {
    taskFor: "Movie",
    taskBg: "#38bdf8",
    taskIcon: "filmstrip",
    iconColor: "#222",
  },
  {
    taskFor: "Home",
    taskBg: "#fbbf24",
    taskIcon: "home-outline",
    iconColor: "#222",
  },
];

export default function TaskCategory({ taskData, closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  const handleCategorySelect = (category) => {
    setSelectedCategory(() => category);

    /*
    strcuture of category object 
      
    const category = {
        iconColor: "#222",
        taskBg: "#f472b6",
        taskFor: "Social",
        taskIcon: "bullhorn-outline"
      }
    };
    */

    const taskFor = category.taskFor;

    const updatedTaskData = {
      ...taskData,
      category: taskFor,
    };

    dispatch(addTask(updatedTaskData));

    closeModal && closeModal();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Category</Text>
        <View style={styles.categoryGrid}>
          {taskCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryCard,
                { backgroundColor: category.taskBg },
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Icon
                name={category.taskIcon}
                size={32}
                color={category.iconColor}
              />
              <Text style={styles.categoryText}>{category.taskFor}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* extra close button inside the modal content */}

        {/* <TouchableOpacity
          style={styles.closeButton}
          onPress={() => closeModal()}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#ff4757",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
