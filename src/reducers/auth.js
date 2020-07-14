const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return {
        user: payload,
      };
    case 'LOG_OUT':
      localStorage.clear();
      return {
        user: null,
      };
    default:
      return state;
  }
};
