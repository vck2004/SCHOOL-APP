const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./src/index.js','./src/component.js','./src/model.js','./src/controller.js','./src/view.js'],
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
    },
    watch: true,
    devtool: 'eval-source-map',
};