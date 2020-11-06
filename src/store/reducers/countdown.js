const initialState = {
  isPlaying: false,
  isDelete: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case 'SET_CONFIRM_COUNTDOWN_SHOW':
      return {
        isPlaying: true,
        isDelete: false,
      };
    case 'SET_DELETE_COUNTDOWN_SHOW':
      return {
        isPlaying: true,
        isDelete: true,
      };
    case 'SET_COUNTDOWN_END':
      return { ...state, isPlaying: false };
    default:
      return state;
  }
};
