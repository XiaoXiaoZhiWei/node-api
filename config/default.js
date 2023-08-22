/** 
const dotenv = require('dotenv')

dotenv.config()

module.exports = process.env
*/

let config;

if (process.env.NODE_ENV === 'local') {
  config = require('./devConfig.js');
} else {
  config = require('./productionConfig');
}

module.exports = config;