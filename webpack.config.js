const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'pablic/js')
  },
}