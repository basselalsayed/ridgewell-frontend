const startConfirmCountdown = () => ({
  type: 'SET_CONFIRM_COUNTDOWN_SHOW',
});
const startDeleteCountdown = () => ({
  type: 'SET_DELETE_COUNTDOWN_SHOW',
});
const endCountdown = () => ({
  type: 'SET_COUNTDOWN_END',
});

export { endCountdown, startConfirmCountdown, startDeleteCountdown };
