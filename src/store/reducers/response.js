const initialState = {
  error: '',
  success: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ERROR':
      return { ...state, error: payload };
    case 'SET_MESSAGE':
      return { ...state, success: payload };

    default:
      return state;
  }
};
