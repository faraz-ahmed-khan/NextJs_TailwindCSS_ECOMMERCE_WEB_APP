const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.message
    : err.message;

export { getError };
