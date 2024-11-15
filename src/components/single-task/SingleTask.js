import React, { useState } from "react";
import colors from "../../../styles/colors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import TaskCategory from "../../ui/TaskOptions"; // Placeholder for your TaskCategory component
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Example for icons, install react-native-vector-icons

export default function SingleTask() {
  const reminder = "Reminder";
  const category = "Category";
  const priority = "Priority";

  const [toggleModalFor, setToggleModalFor] = useState(null);
  const [taskPriority, setTaskPriority] = useState("Low"); // Default priority

  const handleModalToggle = (modalFor) => {
    setToggleModalFor(modalFor);
  };

  const handlePriorityChange = (newPriority) => {
    setTaskPriority(newPriority);
    setToggleModalFor(null); // Close modal after selection
    // Call a dispatch or any method to update the task with the new priority
    // Example: dispatch(setTask({ ...task, priority: newPriority }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity> */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Do Math Homework</Text>
          <Text style={styles.subtitle}>Do chapter 2 to 5 for next week</Text>
        </View>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="pencil" size={24} color="#fff" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.taskInfo}>
        <View style={styles.infoRow}>
          <Icon name="clock-outline" size={24} color="#fff" />
          <Text style={styles.infoLabel}>Task Time :</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => handleModalToggle(reminder)}
          >
            <Text style={styles.infoButtonText}>Today At 16:45</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Icon name="map-marker" size={24} color="#fff" />
          <Text style={styles.infoLabel}>Task Category :</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => handleModalToggle(category)}
          >
            <Text style={styles.infoButtonText}>University</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Icon name="flag-outline" size={24} color="#fff" />
          <Text style={styles.infoLabel}>Task Priority :</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => handleModalToggle(priority)}
          >
            <Text style={styles.infoButtonText}>{taskPriority}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Icon name="delete-outline" size={24} color="red" />
        <Text style={styles.deleteText}>Delete Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editTaskButton}>
        <Text style={styles.editTaskText}>Edit Task</Text>
      </TouchableOpacity>

      {/* Modal Implementation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={toggleModalFor !== null}
        onRequestClose={() => setToggleModalFor(null)}
      >
        <View style={styles.modalOverlay}>
          {toggleModalFor === reminder && (
            <View style={styles.modalContent}>
              <Text>Set Reminder (will implement soon)</Text>
              <TouchableOpacity onPress={() => setToggleModalFor(null)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {toggleModalFor === category && (
            <View style={styles.modalContent}>
              <TaskCategory />
              <TouchableOpacity onPress={() => setToggleModalFor(null)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {toggleModalFor === priority && (
            <View style={styles.modalContent}>
              <Text>Select Task Priority</Text>
              <TouchableOpacity
                onPress={() => handlePriorityChange("Low")}
                style={[
                  styles.priorityButton,
                  taskPriority === "Low" && styles.selectedPriority,
                ]}
              >
                <Text>Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePriorityChange("Medium")}
                style={[
                  styles.priorityButton,
                  taskPriority === "Medium" && styles.selectedPriority,
                ]}
              >
                <Text>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePriorityChange("High")}
                style={[
                  styles.priorityButton,
                  taskPriority === "High" && styles.selectedPriority,
                ]}
              >
                <Text>High</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setToggleModalFor(null)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
  },
  taskInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 10,
  },
  infoButton: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 10,
  },
  infoButtonText: {
    color: "#fff",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  deleteText: {
    fontSize: 16,
    color: "red",
    marginLeft: 10,
  },
  editTaskButton: {
    marginTop: 30,
    backgroundColor: colors.pColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  editTaskText: {
    fontSize: 16,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  priorityButton: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  selectedPriority: {
    backgroundColor: "#cce7ff",
  },
  closeModalText: {
    marginTop: 15,
    color: "blue",
    fontWeight: "bold",
  },
});