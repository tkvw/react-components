import accept from 'attr-accept';

export default ({ patterns = [], getFile = file => file }) => record =>
    patterns.find(pattern => accept(getFile(record), pattern));
