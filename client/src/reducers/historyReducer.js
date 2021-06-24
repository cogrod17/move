export const historyReducer = (workoutHistory = null, action) => {
  switch (action.type) {
    case "WORKOUT_HISTORY":
      return action.payload.reverse();
    case "NEW_WORKOUT":
      return [action.payload, ...workoutHistory];
    case "HISTORY_ERROR":
      return ["error"];
    default:
      return workoutHistory;
  }
};
