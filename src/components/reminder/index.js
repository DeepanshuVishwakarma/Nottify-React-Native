import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addTask } from "@/src/store/reducers/slice";
import colors from "../../../styles/colors";
import { frequency } from "../../utils/constant";
import CustomDatePicker from "../../ui/dateandtime/DatePicker";
import TimeSelector, {
  RemindBeforeNew,
} from "../../ui/dateandtime/TimeSelector";

const DaySelector = ({ onSelect, onClose, isVisible }) => {
  console.log("dayselecorealsdjfalsdfj", isVisible);
  if (!isVisible) return;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {days.map((day) => (
        <TouchableOpacity
          key={day}
          onPress={() => {
            onSelect(day);
            onClose();
          }}
        >
          <Text>{day}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const FrequencySelector = ({ onSelect, isVisible, onClose }) => {
  // ... other component code

  if (!isVisible) return;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {Object.keys(frequency).map((key) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            onSelect(frequency[key]);
            // onClose();
          }}
        >
          <Text>{frequency[key]}</Text>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity onPress={onSelectClose}>
          <Text>Close</Text>
        </TouchableOpacity> */}
    </View>
  );
};

const RemindBefore = ({ onSelect, onClose, taskfordate = null }) => {
  // if (!isVisible) return;
  console.log("haldaja inside remind efore");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [error, setError] = useState(null);

  const taskDate = new Date(taskfordate);
  const now = new Date();
  const diffTime = Math.abs(taskDate - now);
  const maxDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const maxHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const maxMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  const handleSubmit = () => {
    if (!error) {
      onSelect({ days, hours, minutes });
      onClose();
    }
  };

  useEffect(() => {
    if (days > maxDays || hours > maxHours || minutes > maxMinutes) {
      setError("Time exceeds remaining time");
    } else if (days < 0 || hours < 0 || minutes < 0) {
      setError("Invalid time");
    } else {
      setError(null);
    }
  }, [days, hours, minutes, maxDays, maxHours, maxMinutes]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Days"
        keyboardType="numeric"
        value={String(days)}
        onChangeText={(text) => setDays(Number(text))}
        editable={maxDays > 0}
      />
      <TextInput
        placeholder="Hours"
        keyboardType="numeric"
        value={String(hours)}
        onChangeText={(text) => setHours(Number(text))}
        editable={maxHours > 0 || maxDays > 0}
      />
      <TextInput
        placeholder="Minutes"
        keyboardType="numeric"
        value={String(minutes)}
        onChangeText={(text) => setMinutes(Number(text))}
        editable={maxMinutes > 0 || maxHours > 0 || maxDays > 0}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity onPress={handleSubmit} disabled={!!error}>
        <Text>Set Before</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const Reminder = ({ taskdata }) => {
  const dispatch = useDispatch();

  const [toggleModal, setToggleModal] = useState(false);

  const [toggleWeekdDay, setToggleWeekDay] = useState(false);
  const [toggleTimeSelector, setToggleTimeSelector] = useState(false);
  const [toggleDateSelector, setToggleDateSelector] = useState(false);

  const [toggleRemindBefore, setToggleRemindBefore] = useState(false);

  const [reminder, setReminder] = useState({
    ...taskdata?.reminder,
    reason: "",
    repeat: 0,
    frequency: null,
    time: null,
    weekday: null,
    date: null,
    before: {
      days: null,
      hours: null,
      minutes: null,
    },
  });

  const updateReminderInTheTask = () => {
    dispatch(
      addTask({
        ...taskdata,
        reminder: reminder,
      })
    );
  };
  useEffect(() => {
    updateReminderInTheTask();
  }, [reminder]);

  const handleFrequency = (freq) => {
    setReminder({ ...reminder, frequency: freq });
    if (freq === frequency.daily) {
      setToggleTimeSelector(true);
    } else setToggleTimeSelector(false);

    if (freq === frequency.weekly) setToggleWeekDay(true);
    else setToggleWeekDay(false);

    if ([frequency.date, frequency.monthly, frequency.yearly].includes(freq))
      setToggleDateSelector(true);
    else setToggleDateSelector(false);
  };

  const handleTime = (time) => {
    setReminder({ ...reminder, time });

    //at last close the top modal
    setToggleModal(false);
  };

  const handleDate = (dateInfo) => {
    setReminder({ ...reminder, date: dateInfo });
    setToggleTimeSelector(true);
  };

  const handleWeekday = (weekday) => {
    setReminder({ ...reminder, weekday });
    setToggleTimeSelector(true);
  };

  const openRemindBeforeModal = () => {
    setToggleRemindBefore(true);
    setToggleModal(false);
  };
  const handleReminderBefore = ({ days, hours, minutes }) => {
    // before = { days : days, hours : hours, minutes },
    const temp_reminder = {
      ...reminder,
      before: {
        days,
        hours,
        minutes,
      },
    };
    setReminder({ ...temp_reminder });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setToggleModal(true)}>
        <Text>Task For</Text>
      </TouchableOpacity>

      <Modal style={styles.Modal} visible={toggleModal}>
        {/* when u have clicked on task for */}
        <FrequencySelector
          onSelect={handleFrequency}
          isVisible={true}
          onClose={() => setToggleModal(false)}
        />

        {/* whne u selected weekly as ur frequency */}
        <DaySelector
          onSelect={handleWeekday}
          onClose={() => setToggleWeekDay(false)}
          isVisible={toggleWeekdDay}
          value={reminder?.weekday}
        />

        <CustomDatePicker
          onSelect={handleDate}
          onClose={() => setToggleDateSelector(false)}
          positiveButton={{ label: "OK", textColor: "#007bff" }}
          mode="date"
          dd={true}
          mm={
            reminder.frequency == frequency.yearly ||
            reminder.frequency == frequency.date
          }
          yy={reminder.frequency == frequency.date}
          isVisible={toggleDateSelector}
          value={reminder?.date}
        />
        {/* when u have clicked on task for and selected option daily  now select the time  */}
        <TimeSelector
          value={reminder?.time}
          onSelect={handleTime}
          isUpdating={false}
          isVisible={toggleTimeSelector}
          onClose={() => {
            setToggleTimeSelector(false);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setToggleModal(false);
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity onPress={openRemindBeforeModal}>
        <Text> Reminder Before</Text>
      </TouchableOpacity>

      {toggleRemindBefore && (
        <Modal style={styles.Modal} visible={toggleRemindBefore}>
          <RemindBeforeNew
            onSelect={(before) => {
              setReminder({ ...reminder, before });
              setToggleRemindBefore(null);
            }}
            onClose={() => setToggleRemindBefore(null)}
            reminder={reminder}
          />
          <TouchableOpacity
            onPress={() => {
              setToggleRemindBefore(false);
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Modal: {
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    borderRadius: 5,
    height: "70%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
export default Reminder;
