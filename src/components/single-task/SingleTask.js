import React, { useEffect, useState } from "react";
import colors from "../../../styles/colors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Dialog from "../../ui/Dailog";
import AddUpdateTaskModal from "../../ui/AddUpdateTaskModal";
import TaskCategory from "../../ui/TaskOptions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setDeletion } from "@/src/store/reducers/slice";
import { useNavigation } from "@react-navigation/native";
import Reminder from "../../components/reminder/index";
import { priorities } from "@/src/utils/constant";
export default function SingleTask() {
  const reminder = "Reminder";
  const category = "Category";
  const priority = "Priority";

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const taskKey = route.params?.key;

  const tasks = useSelector((state) => state.app.tasks);
  const taskIndex = tasks.findIndex((task) => task.key === taskKey);
  const taskData = taskIndex !== -1 ? tasks[taskIndex] : {};

  // console.log(tasks);

  const [toggleModalFor, setToggleModalFor] = useState(null);
  const [taskPriority, setTaskPriority] = useState(
    taskData?.priority || priorities.low
  ); // default priority
  const [toggleDeleteDialog, setToggleDeleteDialog] = useState(false);

  const handleModalToggle = (modalFor) => {
    setToggleModalFor(modalFor);
  };

  const handlePriorityChange = (newPriority) => {
    setTaskPriority((prev) => newPriority);
    setToggleModalFor(null);
    dispatch(
      addTask({
        ...taskData,
        priority: newPriority,
      })
    );
  };
  // useEffect(()=>{
  //   if(taskData.priority !== taskPriority){
  //     dis
  //   }
  // },[taskPriority])
  const closeModal = () => {
    setToggleModalFor(null);
  };

  const handleDeletion = () => {
    console.log("deleting the task ");
    dispatch(setDeletion(taskData));
    setToggleDeleteDialog(false);
    navigation.navigate("Screen");
  };
  const handleDeleteClick = () => {
    setToggleModalFor(null); // close any existing modal
    setModalVisible(false);
    setToggleDeleteDialog(true); // open delete dialog
  };

  const handleUpdateTask = (task) => {
    if (task.title.trim() === "" || task.description.trim() === "") {
      return;
    }
    const data = {
      ...taskData,
      title: task.title,
      description: task.description,
    };
    dispatch(addTask(data));
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleEditTask = () => {
    setToggleModalFor(null); // close any other modal
    setToggleDeleteDialog(false);

    setModalVisible(true); // open update model
  };

  console.log("task data is updated", taskData);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity> */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{taskData?.title}</Text>
          <Text style={styles.subtitle}>{taskData?.description}</Text>
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
            <Text style={styles.infoButtonText}>
              {taskData && taskData.category
                ? taskData.category
                : "Set Category"}
            </Text>
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

      <TouchableOpacity onPress={handleDeleteClick} style={styles.deleteButton}>
        <Icon name="delete-outline" size={24} color="red" />
        <Text style={styles.deleteText}>Delete Task</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEditTask} style={styles.editTaskButton}>
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
              <TaskCategory taskData={taskData} closeModal={closeModal} />

              {/* extra close button inside the modal content */}

              <TouchableOpacity onPress={() => setToggleModalFor(null)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {toggleModalFor === priority && (
            <View style={styles.modalContent}>
              <Text>Select Task Priority</Text>
              <TouchableOpacity
                onPress={() => handlePriorityChange(priorities.low)}
                style={[
                  styles.priorityButton,
                  taskPriority === priorities.low && styles.selectedPriority,
                ]}
              >
                <Text>{priorities.low}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePriorityChange(priorities.mid)}
                style={[
                  styles.priorityButton,
                  taskPriority === priorities.mid && styles.selectedPriority,
                ]}
              >
                <Text>{priorities.mid}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePriorityChange(priorities.high)}
                style={[
                  styles.priorityButton,
                  taskPriority === priorities.high && styles.selectedPriority,
                ]}
              >
                <Text>{priorities.high}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setToggleModalFor(null)}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
      <Reminder taskdata={taskData}></Reminder>

      <Dialog
        isVisible={toggleDeleteDialog}
        title="Are you sure you want to delete this task?"
        okayButtonText="Delete"
        cancelButtonText="Cancel"
        onClickOkay={handleDeletion}
        onClickCancel={() => setToggleDeleteDialog(false)}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          "{taskData.description}"
        </Text>
      </Dialog>

      <AddUpdateTaskModal
        isVisible={isModalVisible}
        isUpdating={true}
        taskData={taskData}
        onClickClose={toggleModal}
        onClickSubmit={handleUpdateTask}
      />
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
