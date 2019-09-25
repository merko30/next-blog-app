const createAction = actionName => {
  return {
    start: (payload = {}) => ({
      type: actionName,
      payload
    }),
    success: (payload = {}) => ({
      type: `${actionName}_SUCCESS`,
      payload
    }),
    failure: (error = {}) => ({
      type: `${actionName}_FAILURE`,
      error
    })
  };
};

export default createAction;
