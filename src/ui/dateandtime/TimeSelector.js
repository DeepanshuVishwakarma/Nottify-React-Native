import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

const TimeSelector = ({
  onClose,
  value,
  isVisible,
  onSelect,
  isUpdating = false,
}) => {
  if (!isVisible) return;

  const [selectedHour, setSelectedHour] = useState(
    value ? parseInt(value.split(":")[0]) % 12 || 12 : 12
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? parseInt(value.split(":")[1]) % 60 : 0
  );
  const [selectedPeriod, setSelectedPeriod] = useState(
    value && parseInt(value.split(":")[0]) >= 12 ? "PM" : "AM"
  );

  const handleCancel = () => onClose();

  const handleConfirm = () => {
    const hour24 =
      selectedPeriod === "PM" ? (selectedHour % 12) + 12 : selectedHour % 12; // Convert to 24-hour format
    const formattedTime = `${hour24
      .toString()
      .padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;
    if (onSelect) onSelect(formattedTime);
    if (onClose) onClose();
  };

  const renderOptions = (range, selectedValue, setValue, suffix = "") => {
    return (
      <ScrollView style={styles.scrollview}>
        {range.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setValue(value)}
            style={[
              styles.option,
              selectedValue === value && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedValue === value && styles.selectedOptionText,
              ]}
            >
              {value.toString().padStart(2, "0") + suffix}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Select Time</Text>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Hour</Text>
            {renderOptions(
              Array.from({ length: 12 }, (_, i) => i + 1),
              selectedHour,
              setSelectedHour
            )}
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Minute</Text>
            {renderOptions(
              Array.from({ length: 60 }, (_, i) => i),
              selectedMinute,
              setSelectedMinute
            )}
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>AM/PM</Text>
            {renderOptions(["AM", "PM"], selectedPeriod, setSelectedPeriod)}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} style={styles.okButton}>
            <Text style={styles.okText}>{isUpdating ? "Edit" : "OK"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const RemindBeforeNew = ({
  onClose,
  value,
  isVisible = true,
  onSelect,
  isUpdating = false,
  reminder = null,
}) => {
  if (!isVisible) return null;
  console.log("isnide new remind before ");
  const now = new Date();
  const string = `${reminder?.date}T${reminder?.time}`;
  console.log("string ", string);
  const taskDate = new Date(string || "2024-11-24T18:00:00"); // Replace with your dynamic task date
  // const taskDate = new Date("2024-11-24T18:00:00");
  const diffTime = Math.abs(taskDate - now);
  const maxDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const maxHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const maxMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  const [selectedHour, setSelectedHour] = useState(
    value ? parseInt(value.split(":")[0]) % 12 || 12 : 12
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? parseInt(value.split(":")[1]) % 60 : 0
  );
  const [daysBefore, setDaysBefore] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => onClose();

  const handleConfirm = () => {
    if (error) return;
    if (onSelect) {
      const formattedTime = `${daysBefore}d ${selectedHour}h ${selectedMinute}m`;
      onSelect(formattedTime);
    }
    if (onClose) onClose();
  };

  useEffect(() => {
    const days = parseInt(daysBefore) || 0;
    const hours = parseInt(selectedHour) || 0;
    const minutes = parseInt(selectedMinute) || 0;

    if (
      days > maxDays ||
      (days === maxDays && hours > maxHours) ||
      (days === maxDays && hours === maxHours && minutes > maxMinutes)
    ) {
      setError("Time exceeds remaining time");
    } else if (days < 0 || hours < 0 || minutes < 0) {
      setError("Invalid time");
    } else {
      setError(null);
    }
  }, [daysBefore, selectedHour, selectedMinute, maxDays, maxHours, maxMinutes]);

  const renderOptions = (range, selectedValue, setValue, suffix = "") => {
    return (
      <ScrollView style={styles.scrollview}>
        {range.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setValue(value)}
            style={[
              styles.option,
              selectedValue === value && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedValue === value && styles.selectedOptionText,
              ]}
            >
              {value.toString().padStart(2, "0") + suffix}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Remind Before</Text>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Days (Max: {maxDays})</Text>
            <TextInput
              placeholder={`Max: ${maxDays}`}
              keyboardType="numeric"
              value={daysBefore}
              onChangeText={(text) => setDaysBefore(text)}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Hours</Text>
            {renderOptions(
              Array.from({ length: maxHours + 1 }, (_, i) => i),
              selectedHour,
              setSelectedHour
            )}
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Minutes</Text>
            {renderOptions(
              Array.from({ length: maxMinutes + 1 }, (_, i) => i),
              selectedMinute,
              setSelectedMinute
            )}
          </View>
        </View>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} style={styles.okButton}>
            <Text style={styles.okText}>{isUpdating ? "Edit" : "Save"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  openButton: {
    padding: 12,
    backgroundColor: "#1e90ff", // Use a primary blue color
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    height: "50%",
    width: "90%",
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  header: {
    padding: 15,
    // backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    height: "10rem",
  },
  column: {
    alignItems: "center",
    flex: 1, // Equal spacing for each column
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  scrollview: {},
  option: {
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 8,

    backgroundColor: "#f9f9f9", // Slightly off-white for unselected items
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
  selectedOption: {
    backgroundColor: "#1e90ff",
    borderRadius: 10,
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#ff4d4d",
  },
  cancelText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  okButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#1e90ff",
  },
  okText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TimeSelector;
