const parseError = ({ message, response }) => {
  let errorText = '';
  if (response.statusText)
    errorText += `${response.statusText} (${response.status}): `;
  if (response.data.message) errorText += response.data.message;
  if (!response.statusText && !response.data.message) return message;
  return errorText;
};

export { parseError };
