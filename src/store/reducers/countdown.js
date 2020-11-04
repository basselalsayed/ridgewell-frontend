const initialState = {
  isPlaying: false,
  show: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case 'SET_COUNTDOWN_SHOW':
      return {
        show: true,
        isPlaying: true,
      };
    case 'SET_COUNTDOWN_END':
      return initialState;
    default:
      return state;
  }
};
