export const dropdowReducer = (isDropdownOpen = false, action) => {
  switch (action.type) {
    case "TOGGLE_DROPDOWN":
      return !isDropdownOpen;
    default:
      return isDropdownOpen;
  }
};
