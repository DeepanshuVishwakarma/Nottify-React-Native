import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
  Text,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../styles/colors";
import { useDispatch } from "react-redux";
import { addTask, setFilter } from "../../store/reducers/slice";
import AddUpdateTaskModal from "../../ui/AddUpdateTaskModal";
import { ScrollView } from "react-native-gesture-handler";
import {
  frequency,
  priorities,
  statuses,
  taskCategories,
} from "@/src/utils/constant";

const FilterValue = ({ value }) => {
  return (
    <TouchableOpacity>
      <View>{value}</View>
    </TouchableOpacity>
  );
};

// const FilterComponent = ({tasks}) => {
//   if (tasks.length <=0) return <Text>You haven't add any task yet</Text>

//   const [filteredTasks , setFilteredTasks] = useState([]);

//   const [ appliedFilters, setAppliedFilters] = useState({
//     priorityFilters : [], // ["Low"  , "Medium" , "High" ]
//     frequencyFilters : [], // [ "Daily" , "Weekly" , "Monthly" , "Yearly" , "Select Date" ]
//     statusFilters : [],  // ["completed", "unfinished"]
//     categoryFilters : [], // [Grocery
//   //   Work
//   //   Sport
//   //   Design
//   //   University
//   //   Social
//   //   Music
//   //   Health
//   //   Movie
//   // ]
//     datesFilters : [], // [ dates in this formate 2024-11-30 , 2025-12-03 , etc]

//   })

//   const handleApply = ()=>{
//     dispatch(setFilter(appliedFilters));

//   }
//   const handleClearAllFilters = ()=>{
//     setAppliedFilters({
//       priorityFilters : [], // ["Low"  , "Medium" , "High" ]
//       frequencyFilters : [], // [ "Daily" , "Weekly" , "Monthly" , "Yearly" , "Select Date" ]
//       statusFilters : [],  // ["completed", "unfinished"]
//       categoryFilters : [], // [Grocery

//       datesFilters : [],)
//       dispatch(setFilter ({
//         priorityFilters : [], // ["Low"  , "Medium" , "High" ]
//         frequencyFilters : [], // [ "Daily" , "Weekly" , "Monthly" , "Yearly" , "Select Date" ]
//         statusFilters : [],  // ["completed", "unfinished"]
//         categoryFilters : [], // [Grocery

//         datesFilters : [],)))
//   }
//   // useEffect(()=>{

//   //   });
//   // },[filterArray]);

//   const status = {
//     completed: "completed",
//     unfinished: "unfinished",
//   };
//   const frequency = {
//     daily: "Daily",
//     weekly: "Weekly",
//     monthly: "Monthly",
//     yearly: "Yearly",
//     date: "Select Date",
//   };
//    const priorities = {
//     mid: "Medium",
//     low: "Low",
//     high: "High",
//   };

//   const taskCategories = [
//     {
//       taskFor: "Grocery",
//       taskBg: "#a3e635",
//       taskIcon: "bread-slice-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Work",
//       taskBg: "#f87171",
//       taskIcon: "briefcase-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Sport",
//       taskBg: "#67e8f9",
//       taskIcon: "dumbbell",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Design",
//       taskBg: "#4ade80",
//       taskIcon: "palette-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "University",
//       taskBg: "#60a5fa",
//       taskIcon: "school-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Social",
//       taskBg: "#f472b6",
//       taskIcon: "bullhorn-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Music",
//       taskBg: "#e879f9",
//       taskIcon: "music-note-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Health",
//       taskBg: "#34d399",
//       taskIcon: "heart-outline",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Movie",
//       taskBg: "#38bdf8",
//       taskIcon: "filmstrip",
//       iconColor: "#222",
//     },
//     {
//       taskFor: "Home",
//       taskBg: "#fbbf24",
//       taskIcon: "home-outline",
//       iconColor: "#222",
//     },
//   ];

//   return <View>
//     <Text>
//       Frequncy
//     </Text>
//     <View>
//       {
//         Object.keys(frequency).forEach(key => {
//           return (
//             <View>
//               <Text> {key} </Text>
//              // check this if it's already included in that appliedFilters array , if it's included
//              // then show a checked box otherwise unchecked

//               ? <CheckBox onPress ={()=>{ push frequency[key] in the appliedFilters.frequency}}
//               : <unchecked onPress = {()=>{remove value frequency[key] from applied filters.frequency}}

//             </View>
//           )

//         }
//       )
//       }

//       now repated whole this proces for each 4 of those , just leave that datefilter for now ,

//       in category , i want to u to show text as tastcategory.map(cat){
//         cat.taskFor
//         cat.taskFOr push and remove
//       }
//     </View>
//   </View>;
// };

const FilterComponent = ({ onClose }) => {
  const dispatch = useDispatch();

  const [appliedFilters, setAppliedFilters] = useState({
    priorityFilters: [],
    frequencyFilters: [],
    statusFilters: [],
    categoryFilters: [],
    datesFilters: [],
  });

  const frequency = ["Daily", "Weekly", "Monthly", "Yearly", "Select Date"];
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["completed", "unfinished"];
  const taskCategories = [
    "Grocery",
    "Work",
    "Sport",
    "Design",
    "University",
    "Social",
    "Music",
    "Health",
    "Movie",
    "Home",
  ];

  const handleApply = () => {
    dispatch(setFilter(appliedFilters));
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {
      priorityFilters: [],
      frequencyFilters: [],
      statusFilters: [],
      categoryFilters: [],
      datesFilters: [],
    };
    setAppliedFilters(clearedFilters);
    dispatch(setFilter(clearedFilters));
  };

  const toggleFilter = (filterType, value) => {
    setAppliedFilters((prev) => {
      const filters = [...prev[filterType]];
      const index = filters.indexOf(value);
      if (index === -1) filters.push(value);
      else filters.splice(index, 1);
      return { ...prev, [filterType]: filters };
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      <Text style={styles.sectionTitle}>Frequency:</Text>
      {frequency.length &&
        frequency.map((freq) => (
          <View key={freq} style={styles.filterRow}>
            <Text style={styles.filterText}>{freq}</Text>
            <CheckBox
              style={styles.checkBox}
              value={appliedFilters.frequencyFilters.includes(freq)}
              onValueChange={() => toggleFilter("frequencyFilters", freq)}
            />
          </View>
        ))}

      <Text style={styles.sectionTitle}>Priority:</Text>
      {priorities.length &&
        priorities.map((priority) => (
          <View key={priority} style={styles.filterRow}>
            <Text style={styles.filterText}>{priority}</Text>
            <CheckBox
              style={styles.checkBox}
              value={appliedFilters.priorityFilters.includes(priority)}
              onValueChange={() => toggleFilter("priorityFilters", priority)}
            />
          </View>
        ))}

      <Text style={styles.sectionTitle}>Status:</Text>
      {statuses.length &&
        statuses.map((status) => (
          <View key={status} style={styles.filterRow}>
            <Text style={styles.filterText}>{status}</Text>
            <CheckBox
              style={styles.checkBox}
              value={appliedFilters.statusFilters.includes(status)}
              onValueChange={() => toggleFilter("statusFilters", status)}
            />
          </View>
        ))}

      <Text style={styles.sectionTitle}>Categories:</Text>
      {taskCategories.length &&
        taskCategories.map((category) => (
          <View key={category} style={styles.filterRow}>
            <Text style={styles.filterText}>{category}</Text>
            <CheckBox
              style={styles.checkBox}
              value={appliedFilters.categoryFilters.includes(category)}
              onValueChange={() => toggleFilter("categoryFilters", category)}
            />
          </View>
        ))}

      <TouchableOpacity style={styles.button} onPress={handleApply}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleClearAllFilters}>
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Bottom = ({ tasks }) => {
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
  const [toggleFilters, setToggleFilters] = useState(false);

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity style={styles.plusCircle} onPress={toggleModal}>
        <Icon name="plus" size={40} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.iconrow}>
        <View style={styles.iconNameContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setToggleFilters(!toggleFilters)}
          >
            <Icon name="filter" style={styles.bottomIcons} />
          </TouchableOpacity>
          <Text style={styles.iconName}>Filter</Text>
        </View>
        <View style={styles.iconNameContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={null}>
            <Icon name="calendar" style={styles.bottomIcons} />
          </TouchableOpacity>
          <Text style={styles.iconName}>Today's Task</Text>
        </View>
        <View style={styles.iconNameContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={null}>
            <Icon name="clockcircle" style={styles.bottomIcons} />
          </TouchableOpacity>
          <Text style={styles.iconName}>Time</Text>
        </View>
        <View style={styles.iconNameContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={null}>
            <Icon name="none" style={styles.bottomIcons} />
          </TouchableOpacity>
          <Text style={styles.iconName}>Repeat</Text>
        </View>
      </View>
      <AddUpdateTaskModal
        isVisible={isModalVisible}
        isUpdating={false}
        taskData={null}
        onClickClose={toggleModal}
        onClickSubmit={handleAddTask}
      />
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={toggleFilters}
      >
        <FilterComponent
          tasks={tasks}
          onClose={() => setToggleFilters(false)}
        ></FilterComponent>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenCon: {
    flex: 1,
    justifyContent: "space-between",
  },
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
  iconrow: {
    position: "absolute",
    top: "3rem",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    top: "1.5rem",
  },
  iconNameContainer: {
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
  },
  bottomIcons: {
    fontSize: 24,
    color: colors.white,
  },
  iconName: {
    color: colors.white,
    fontSize: 12,
  },

  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    padding: 20,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitle: {
    color: colors.pColor,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.iColor,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filterText: {
    color: colors.white,
    fontSize: 16,
  },
  checkBox: {
    borderColor: colors.border,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.pColor,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: colors.anotherColor,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Bottom;
