export const openForm = (name) => {
  return {
    type: "OPEN_FORM",
    payload: name,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const closeForm = () => {
  return {
    type: "CLOSE_FORM",
    payload: null,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const toggleDropdown = () => {
  return {
    type: "TOGGLE_DROPDOWN",
    payload: null,
  };
};
