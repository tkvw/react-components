import deepDiff from 'deep-diff';

const sparseUpdate = (lhs, rhs, { idProperty = 'id' } = {}) => {
    const shallowClone = v => {
        if (Array.isArray(v)) {
            return v.map(item => shallowClone(item));
        } else if (typeof v === 'object') {
            return v[idProperty] ? { [idProperty]: v[idProperty] } : v;
        } else {
            return v;
        }
    };
    const setupPath = (path, source, target, index = 0) => {
        if (index < path.length - 1) {
            source = source[path[index]];
            target[path[index]] = target[path[index]] || shallowClone(source);
            setupPath(path, source, target[path[index]], index + 1);
        }
    };

    let result = shallowClone(lhs);
    deepDiff.observableDiff(lhs, rhs, diff => {
        setupPath(diff.path, lhs, result);
        deepDiff.applyChange(result, lhs, diff);
    });
    return result;
};

export default sparseUpdate;
