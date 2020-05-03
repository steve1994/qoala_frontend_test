const withCSS = require('@zeit/next-css')
const path = require('path');
const webpack = require('webpack');

module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    },
    webpack: (config) => {
        config.resolve.alias['~'] = path.resolve(__dirname);
        return config;
    }
})
