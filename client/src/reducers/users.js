export const initialUser = {
  email: '',
  firstName: '',
  lastName: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '',
  },
};

export const updateUser = (state, action) => {
  switch (action.type) {
    case 'overwrite':
      return action.payload;
    case 'email':
      return { ...state, email: action.payload };

      // example case
    case 'prop3':
      return {
        ...state,
        prop1: {
          ...state.prop1,
          prop3: action.payload,
        },
      };
    case 'reset':
      return initialUser;
    default:
      return console.log('There is no user action of this type.');
  }
};
