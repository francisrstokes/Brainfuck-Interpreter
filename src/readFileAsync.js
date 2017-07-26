const {promisify} = require('util');
const readFileAsync = promisify(require('fs').readFile);

module.exports = readFileAsync;