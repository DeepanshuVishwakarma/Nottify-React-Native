import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "hello this is a react app",
  slide: 0,
  tasks: [],
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSlide: (state, action) => {
      state.slide = action.payload;
    },
    setTasks: (state, action) => {
      const updatedTask = action.payload; // The task you want to update
      // Find the index of the task that matches the key
      const taskIndex = state.tasks.findIndex(
        (task) => task.key === updatedTask.key
      );

      if (taskIndex !== -1) {
        // Task exists, update it
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          status: updatedTask.status,
        };
      } else {
        // Task doesn't exist, add it as a new task
        state.tasks.push(updatedTask);
      }
    },
    setDeletion: (state, action) => {
      const taskKeyToDelete = action.payload.key;
      state.tasks = state.tasks.filter((task) => task.key !== taskKeyToDelete);
    },
  },
});

export const { setSlide, setTasks, setDeletion } = appSlice.actions;
export default appSlice.reducer;
