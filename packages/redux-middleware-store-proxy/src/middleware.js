export default () => {
    let reduxStore;
    let queue;

    return Object.assign(
        store => {
            reduxStore = store;

            while (queue && queue.length > 0) {
                queue.pop()(store);
            }
            return next => action => next(action);
        },
        {
            withStore: () =>
                reduxStore
                    ? Promise.resolve(reduxStore)
                    : new Promise(resolve => {
                          queue = queue ? queue.push(resolve) : [resolve];
                      }),
        }
    );
};
