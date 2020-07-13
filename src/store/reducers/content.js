const initialState = {
  users: null,
  holidays: null,
  requests: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USERS':
      return { ...state, users: payload };
    case 'SET_HOLIDAYS':
      return { ...state, holidays: payload };
    case 'SET_REQUESTS':
      return { ...state, requests: payload };

    default:
      return state;
  }
};
