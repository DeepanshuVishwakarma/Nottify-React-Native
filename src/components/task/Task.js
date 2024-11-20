import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import CheckIcon from "react-native-vector-icons/Entypo";
import CancelIcon from "react-native-vector-icons/MaterialIcons";
import IconCheck from "react-native-vector-icons/Feather";
import TagIcon from "react-native-vector-icons/AntDesign";
import { Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDeletion, addTask } from "../../store/reducers/slice";
import { useNavigation } from "@react-navigation/native";
import Dialog from "../../ui/Dailog";
export default function Task({ taskdata }) {
  const navigation = useNavigation();
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const { tasks } = useSelector((state) => state.app);

  useEffect(() => {
    console.log("Component re-rendered.");
  }, [tasks]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDeletion = () => {
    if (taskdata.key && taskdata.title) {
      dispatch(setDeletion(taskdata));
      toggleModal();
    }
  };
  const handleCompletion = () => {
    const updatedTask = { ...taskdata, status: "completed" };
    dispatch(addTask(updatedTask)); // Dispatch the updated task directly
  };

  const openSingleTask = () => {
    const keyForCurentTask = taskdata.key;
    navigation.navigate("SingleTask", { key: keyForCurentTask });
  };
  console.log(taskdata, "data from task component ");
  return (
    <View style={styles.task}>
      <TouchableOpacity onPress={openSingleTask}>
        <View style={styles.left}>
          <View style={styles.circle}></View>
        </View>
      </TouchableOpacity>
      <View style={styles.right}>
        <TouchableOpacity onPress={openSingleTask}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{taskdata.title}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.descriptionCon}>
          {/* <View style={styles.dateCon}>
            <Text style={styles.date}>{taskdata.date}</Text>
          </View> */}
          <View style={styles.icons}>
            {taskdata?.category ? (
              <View style={styles.title}>{taskdata.category}</View>
            ) : (
              <TouchableOpacity style={styles.tag}>
                <TagIcon name="tagso" size={30} color={colors.border} />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity style={styles.reminder}>
              {!isActive ? (
                <Icon name="alarm" size={30} color={colors.border} />
              ) : (
                <Icon name="alarm-on" size={30} color={colors.border} />
              )}
            </TouchableOpacity> */}
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.doneBox}
                onPress={handleCompletion}
              >
                <IconCheck
                  name={
                    taskdata.status === "completed" ? "check-circle" : "check"
                  }
                  color={
                    taskdata.status === "completed"
                      ? colors.pColor
                      : colors.border
                  }
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={styles.cancelBox}>
                <CancelIcon name="cancel" style={styles.cancel} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.addTask}>
              Are u sure u want to delete this task{" "}
            </Text>
            <Text style={styles.deletionTitle}>"{taskdata.title}"</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleDeletion}
              >
                <Text style={styles.txt}>okay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.txt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      <Dialog
        isVisible={isModalVisible}
        title="Are you sure you want to delete this task?"
        okayButtonText="Delete"
        cancelButtonText="Cancel"
        onClickOkay={handleDeletion}
        onClickCancel={() => setModalVisible(false)}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          "{taskdata.title}"
        </Text>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    padding: 5,
    backgroundColor: colors.sColor,
  },
  left: {
    width: 20,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 50,
    width: 15,
    height: 15,
  },
  right: {
    flex: 1,
    marginLeft: 10,
  },
  titleContainer: {
    height: "50%",
  },
  title: {
    color: colors.white,
    fontSize: 16,
  },
  descriptionCon: {
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: colors.border,
    fontSize: 14,
  },
  icons: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "flex-start",
  },
  tag: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginRight: 5,
  },
  reminder: {
    width: 20,
    height: 20,
    backgroundColor: colors.secondary,
    borderRadius: 50,
  },
  buttons: {},
  buttonRow: {
    flexDirection: "row",
    columnGap: 20,
  },
  //   doneBox: {
  //     flex: 1,
  //     height: 30,
  //     borderWidth: 1,
  //     borderRadius: 20,
  //     borderColor: "purple",
  //     backgroundColor: "rgba(255, 0, 255, 0.5)",
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     marginRight: 10,
  //   },
  //   cancelBox: {
  //     flex: 1,
  //     height: 30,
  //     borderWidth: 1,
  //     borderRadius: 20,
  //     borderColor: "purple",
  //     backgroundColor: "rgba(255, 0, 255, 0.5)",
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  cancelText: {
    color: colors.white,
  },

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
  addTask: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
  deletionTitle: {
    fontSize: 16,
    color: "white",
    paddingBottom: 20,
    textAlign: "center",
  },
});
