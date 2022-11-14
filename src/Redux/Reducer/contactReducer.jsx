const initialState = [
  {
    id: 0,
    FirstName: "Ram",
    MiddleName: "Prasad",
    LastName: "Poudel",
    Gender: "Male",
    Email: "rampoudel33@gmail.com",
    ContactNumber: 2347824433,
  },
  {
    id: 1,
    FirstName: "Jerry",
    MiddleName: "",
    LastName: "Singh",
    Gender: "Female",
    Email: "jerry55@gmail.com",
    ContactNumber: 3485721099,
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      state = [...state, action.payload];
      console.log(state);
      localStorage.setItem("datum", JSON.stringify(state));
      return state;
    case "UPDATE_EMPLOYEE":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      localStorage.setItem("datum", JSON.stringify(state));
      return state;
    case "DELETE_EMPLOYEE":
      // const filterEmployee = state.filter(
      //   (contact) => contact.id !== action.payload && contact
      // );
      // state = filterEmployee;

      // console.log("state1", state);
      // const deletedContact = state.splice(action.payload, 1);
      // console.log(deletedContact);
      // state = deletedContact;
      // console.log("state2", state);
      // return state;

      const filterEmployee = JSON.parse(localStorage.getItem("datum")).filter(
        (contact) => contact.id !== action.payload && contact
      );
      console.log(filterEmployee);
      state = filterEmployee;
      localStorage.setItem("datum", JSON.stringify(state));
      return state;

    case "EMP_LIST":
      state = [...state, action.payload];
      localStorage.setItem("datum", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};

export default contactReducer;
