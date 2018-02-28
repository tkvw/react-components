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
            '@tkvw/react-admin': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-admin',
                'src'
            ),
            '@tkvw/react-cropperjs': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-cropperjs',
                'src'
            ),
            '@tkvw/react-image': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-image',
                'src'
            ),
            '@tkvw/react-image-transformation': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-image-transformation',
                'src'
            ),
            '@tkvw/react-material-cropperjs': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-material-cropperjs',
                'src'
            ),
            '@tkvw/react-material-fileinput': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-material-fileinput',
                'src'
            ),
            '@tkvw/react-material-image': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-material-image',
                'src'
            ),
            '@tkvw/react-override-reducer': path.join(
                __dirname,
                '..',
                '..',
                'packages',
                'react-override-reducer',
                'src'
            ),
        },
    },
};
