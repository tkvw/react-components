export default (
    target,
    {
        arrayIndex = index => '[' + index + ']',
        maxDepth,
        delimiter = '.',
        excludeArray,
        excludes = [],
    } = {}
) => {
    const result = {};

    const step = (object, prev, depth = 1) => {
        if (maxDepth && maxDepth <= depth) return;
        if (prev && excludes.indexOf(prev) !== -1) return;

        if (Array.isArray(object)) {
            if (!excludeArray) {
                object.forEach((item, index) => {
                    const nextKey = prev + arrayIndex(index);
                    step(item, nextKey, depth + 1);
                });
            }
        } else if (typeof object === 'object') {
            Object.keys(object).forEach(key => {
                const value = object[key];

                const nextKey = prev ? prev + delimiter + key : key;

                step(value, nextKey, depth + 1);
            });
        } else {
            result[prev] = object;
        }
    };
    step(target);
    return result;
};
