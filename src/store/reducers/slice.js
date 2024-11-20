import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "hello this is a react app",
  slide: 0,
  tasks: [],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  frequency: ["Daily", "Weekly", "Monthly", "Yearly", "Select Date"],
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSlide: (state, action) => {
      state.slide = action.payload;
    },
    addTask: (state, action) => {
      // can be used to update the current task as well , but
      // exptects you to send a task in action.payload

      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(
        (task) => task.key === updatedTask.key
      );

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      } else {
        state.tasks.push(updatedTask);
      }
    },

    setDeletion: (state, action) => {
      const taskKeyToDelete = action.payload.key;
      state.tasks = state.tasks.filter((task) => task.key !== taskKeyToDelete);
    },
  },
});

export const { setSlide, addTask, setDeletion, deleteTask } = appSlice.actions;
export default appSlice.reducer;
