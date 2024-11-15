import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/EvilIcons";
import Task from "../task/Task";
import { useSelector } from "react-redux";

export default function Home() {
  const { tasks } = useSelector((state) => state.app);
  const [search, setSearch] = useState(null);
  console.log("tasks", tasks);
  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Add Your Tasks Here</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            value={search}
            placeholder="Search Your Tasks Here"
            placeholderTextColor={colors.border}
          />
          <Icon
            name="search"
            size={30}
            color={colors.border}
            style={styles.icon}
          />
        </View>
      </View>
      {/* <Task data={{ title: "Go To Market", date: "today at 6pm" }} /> */}
      <View style={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Task
              tasks={tasks}
              key={index} // Make sure to provide a unique key for each item in the list
              // data={{ title: task.title, date: task.date }} // Corrected the object structure
              taskdata={task}
            />
          ))
        ) : (
          <Text style={styles.noTask}>
            Add Some Tasks For Better productivity
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: colors.white,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    backgroundColor: colors.iColor,
  },
  input: {
    flex: 1,
    height: 47,
    padding: 12,
    paddingHorizontal: 12,
    color: colors.white,
  },
  icon: {
    padding: 10,
    backgroundColor: colors.iColor,
    borderRadius: 4,
  },
  noTask: {
    fontSize: 20,
    color: colors.white,
  },
  taskList: {
    flex: 1,
    rowGap: 20,
    marginTop: 50,
  },
});
