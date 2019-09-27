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
    failure: (payload = {}) => ({
      type: `${actionName}_FAILURE`,
      payload
    })
  };
};

export default createAction;
