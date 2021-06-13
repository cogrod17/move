export const openModal = (name) => {
  return {
    type: "OPEN_MODAL",
    payload: name,
  };
};

//////////////////////////////////////
//////////////////////////////////////

export const closeModal = () => {
  return {
    type: "CLOSE_MODAL",
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
