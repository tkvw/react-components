export default () => {
    let reduxStore;
    let queue;

    Object.assign(
        store => {
            reduxStore = store;

            while (queue && queue.length > 0) {
                queue.pop()(store);
            }
            return next => action => next(action);
        },
        {
            withStore: callback => {
                reduxStore
                    ? callback(reduxStore)
                    : queue ? queue.push(callback) : [callback];
            },
        }
    );
};
