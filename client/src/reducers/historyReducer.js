export const historyReducer = (workoutHistory = null, action) => {
  switch (action.type) {
    case "WORKOUT_HISTORY":
      return action.payload.length > 1
        ? action.payload.reverse()
        : action.payload;
    case "NEW_WORKOUT":
      return [action.payload, ...workoutHistory];
    case "HISTORY_ERROR":
      return ["error"];
    default:
      return workoutHistory;
  }
};
