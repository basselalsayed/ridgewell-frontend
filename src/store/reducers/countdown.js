const initialState = {
  isPlaying: false,
  isDelete: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case 'SET_COUNTDOWN_SHOW':
      return {
        isPlaying: true,
      };
    case 'SET_DELETE_COUNTDOWN_SHOW':
      return {
        isPlaying: true,
        isDelete: true,
      };
    case 'SET_COUNTDOWN_END':
      return initialState;
    default:
      return state;
  }
};
