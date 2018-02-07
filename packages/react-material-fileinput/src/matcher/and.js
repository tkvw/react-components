export default (...args) => file => ![...args].find(it => !it(file));
