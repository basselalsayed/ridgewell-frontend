const parseError = error => {
  let errorText = '';
  if (error.statusText) errorText += error.statusText;
  if (error.response.message) errorText += ` ${error.response.message}`;
  if (!error.statusText && !error.response.message) errorText = error;
  return errorText;
};

export { parseError };
