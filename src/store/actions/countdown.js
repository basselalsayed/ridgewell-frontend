const startCountdown = () => ({
  type: 'SET_COUNTDOWN_SHOW',
});
const endCountdown = () => ({
  type: 'SET_COUNTDOWN_END',
});

export { endCountdown, startCountdown };
