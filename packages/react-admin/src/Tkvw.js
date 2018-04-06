import memoizOne from 'memoize-one';

const _findAllChildren = (child, match, acc = []) => {
    if (Array.isArray(child)) {
        child.forEach(c => _findAllChildren(c, match, acc));
    } else {
        const matched = match(child);
        if (matched) {
            acc.push(matched);
        } else if (child && child.props && child.props.children) {
            _findAllChildren(child.props.children, match, acc);
        }
    }
    return acc;
};
export const findAllChildren = memoizOne(_findAllChildren);
const _findChild = (child, match) => {
    if (Array.isArray(child)) {
        return child.find(c => _findChild(c, match));
    } else {
        const matched = match(child);
        if (matched) {
            return matched;
        } else if (child && child.props && child.props.children) {
            return _findChild(child.props.children, match);
        }
    }
    return null;
};
export const findChild = match => child => _findChild(child, match);
