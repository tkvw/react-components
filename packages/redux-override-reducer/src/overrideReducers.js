export default (...overrideReducers) => reducer => (state, action) =>
    overrideReducers.reduce(
        (nextState, overrideReducer) => overrideReducer(nextState, action),
        reducer(state, action)
    );
