const merge = require('webpack-merge');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge.smart(baseConfig, {
    name: 'dd key Gen',
    mode: 'production'
});
