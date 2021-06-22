export const historyReducer = (workoutHistory = null, action) => {
  switch (action.type) {
    case "WORKOUT_HISTORY":
      return action.payload;
    case "HISTORY_ERROR":
      return ["error"];
    default:
      return workoutHistory;
  }
};
