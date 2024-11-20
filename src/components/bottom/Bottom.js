import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../styles/colors";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/reducers/slice";
import AddUpdateTaskModal from "../../ui/AddUpdateTaskModal";

const Bottom = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddTask = (task) => {
    if (task.title.trim() === "" || task.description.trim() === "") {
      return;
    }
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;

    const uniqueKey = `${formattedDate} ${currentTime}`;

    const data = {
      ...task,
      date: formattedDate,
      status: "unfinished",
      time: currentTime,
      key: uniqueKey,
    };
    dispatch(addTask(data));
  };

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity style={styles.plusCircle} onPress={toggleModal}>
        <Icon name="plus" size={40} color={colors.white} />
      </TouchableOpacity>

      <AddUpdateTaskModal
        isVisible={isModalVisible}
        isUpdating={false}
        taskData={null}
        onClickClose={toggleModal}
        onClickSubmit={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.sColor,
    height: 110,
  },
  plusCircle: {
    backgroundColor: colors.pColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    top: -30,
  },
});

export default Bottom;
