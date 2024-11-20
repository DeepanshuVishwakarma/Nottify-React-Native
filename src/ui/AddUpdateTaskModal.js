import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Modal,
} from "react-native";
import IconCheck from "react-native-vector-icons/Feather";
import colors from "../../styles/colors";

const AddUpdateTaskModal = ({
  isUpdating,
  taskData,
  onClickClose,
  onClickSubmit,
  isVisible,
}) => {
  if (isUpdating) {
    if (!taskData) {
      throw new Error("Task data must be provided when updating a task.");
    }
  }

  const [added, setAdded] = useState(false);
  const [task, setTask] = useState({
    title: isUpdating ? taskData.title : "",
    description: isUpdating ? taskData.description : "",
    task_for_date: isUpdating ? taskData?.task_for_date : null,
  });

  const handleDescriptionChange = (newDescription) => {
    setTask({
      ...task,
      description: newDescription || "",
    });
  };

  const handleTitleChange = (newTitle) => {
    setTask({
      ...task,
      title: newTitle || "",
    });
  };

  const handleSubmit = () => {
    onClickSubmit(task);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setTask({ title: "", description: "", date: "" });
      onClickClose();
    }, 1000);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClickClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {added ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Task has been {isUpdating ? "updated" : "added"}{" "}
                <IconCheck
                  name="check-circle"
                  size={20}
                  color={colors.pColor}
                />
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.addTask}>
                {isUpdating ? "Update Task" : "Add Task"}
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleTitleChange}
                value={task.title}
                placeholder="Title"
                placeholderTextColor={colors.border}
              />
              <TextInput
                style={styles.input}
                onChangeText={handleDescriptionChange}
                value={task.description}
                placeholder="Description"
                placeholderTextColor={colors.border}
              />
              {/* <RNDateTimePicker
              value={date}
              mode={mode}
              style={{ backgroundColor: "black", borderRadius: 10 }}
              textColor={colors.pColor}
              display={mode === "time" ? "clock" : "calendar"}
              onChange={null}
              positiveButton={{ label: "OK", textColor: colors.pColor }}
            /> */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.txt}>
                    {isUpdating ? "Update" : "Add"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClickClose}
                >
                  <Text style={styles.txt}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.sColor,
    borderRadius: 16,
    padding: 20,
    width: "80%",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  addTask: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.iColor,
    height: 47,
    padding: 12,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.pColor,
    padding: 15,
    marginRight: 10,
    borderRadius: 4,
  },
  closeButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.sColor,
    padding: 15,
    marginLeft: 10,
    borderRadius: 4,
  },
  txt: {
    color: colors.white,
  },
});

export default AddUpdateTaskModal;
