const args = process.argv;

process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

const raCore = require('ra-core');

console.log(Object.keys(raCore));
