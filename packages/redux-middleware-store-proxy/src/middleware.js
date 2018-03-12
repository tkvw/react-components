export default () => {
    let reduxStore;
    let queue = [];

    return Object.assign(
        store => {
            reduxStore = store;

            while (queue && queue.length > 0) {
                queue.pop()(store);
            }
            return next => action => next(action);
        },
        {
            withStore: callback =>
                reduxStore
                    ? callback(reduxStore)
                    : new Promise(resolve => {
                          const handler = store => resolve(callback(store));
                          queue.push(handler);
                      }),
        }
    );
};
