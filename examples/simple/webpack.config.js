const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ],
    },
    resolve: {
        alias: {
            '@tkvw/react-admin-addons': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-admin-addons',
                'src'
            ),
            //            'react-admin': path.join(
            //                __dirname,
            //                '..',
            //                '..',
            //                'packages',
            //                'react-admin',
            //                'src'
            //            ),
            //            'ra-data-fakerest': path.join(
            //                __dirname,
            //                '..',
            //                '..',
            //                'packages',
            //                'ra-data-fakerest',
            //                'src'
            //            ),
            //            'ra-input-rich-text': path.join(
            //                __dirname,
            //                '..',
            //                '..',
            //                'packages',
            //                'ra-input-rich-text',
            //                'src'
            //            ),
        },
    },
};
