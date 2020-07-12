const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload };
    case 'LOG_OUT':
      localStorage.clear();
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
