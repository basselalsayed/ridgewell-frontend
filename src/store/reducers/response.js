const initialState = {
  error: '',
  show: false,
  success: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ERROR':
      return { ...state, error: payload, show: true };
    case 'SET_MESSAGE':
      return { ...state, success: payload, show: true };
    case 'HIDE_ALERT':
      return { ...state, show: false };
    default:
      return state;
  }
};
