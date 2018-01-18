var path = require('path');
require("babel-polyfill");

module.exports = {
 entry: ["babel-polyfill",'./src/client.js'],
 output: {
 filename: 'bundle.js',
 path: path.resolve(__dirname, 'public')
 },
 watch: true,
 module:{
 loaders: [
 {
 test:/\.js$/,
 exclude:/node_modules/,
 loader: 'babel-loader',
 query: {
 presets: ['react', 'es2015','stage-1']
 }
 }
 ]
 }
}