import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";

const CustomDatePicker = ({
  isVisible,
  value,
  positiveButton,
  onSelect,
  onClose,
  dd,
  mm,
  yy,
}) => {
  if (!isVisible) return;
  console.log("dd", dd, "yy", yy, "mm", mm, value);

  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handleDateSelect = (day) => {
    if (!dd) return;

    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const handleMonthChange = (direction) => {
    console.log("handleMonthChange", mm, direction);
    if (!mm) {
      return;
    }

    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleYearChange = (direction) => {
    if (!yy) {
      return;
    }
    setCurrentYear((prevYear) => prevYear + direction);
  };

  const handleConfirm = () => {
    const date = new Date(selectedDate);

    const [day, month, year] = date.toLocaleDateString("en-GB").split("/");

    const formattedDate = `${year}-${month}-${day}`;
    if (onSelect) onSelect(formattedDate);
    if (onClose) onClose();
  };

  const handleCancel = () => onClose();

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <View style={styles.daysContainer}>
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.emptyDay} />
        ))}
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDateSelect(day)}
            style={[
              styles.day,
              selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear &&
                styles.selectedDay,
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleYearChange(-1)} disabled={!yy}>
            <Text style={styles.navText}>{"<<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMonthChange(-1)}
            disabled={!mm}
          >
            <Text style={styles.navText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {`${currentMonth + 1}/${currentYear}`}
          </Text>
          <TouchableOpacity onPress={() => handleMonthChange(1)} disabled={!mm}>
            <Text style={styles.navText}>{">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleYearChange(1)} disabled={!yy}>
            <Text style={styles.navText}>{">>"}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.weekDays}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <Text key={index} style={styles.weekDay}>
                  {day}
                </Text>
              )
            )}
          </View>
          {renderDays()}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} style={styles.okButton}>
            <Text style={[styles.okText, { color: positiveButton.textColor }]}>
              {positiveButton.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  openButton: {
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    borderRadius: 5,
  },
  openButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  navText: {
    fontSize: 16,
    padding: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: "#eee",
  },
  weekDay: {
    fontSize: 14,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  emptyDay: {
    width: "14%",
  },
  day: {
    width: "14%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginVertical: 2,
  },
  dayText: {
    fontSize: 14,
  },
  selectedDay: {
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
  okButton: {
    padding: 10,
  },
  okText: {
    fontSize: 16,
  },
});

export default CustomDatePicker;
