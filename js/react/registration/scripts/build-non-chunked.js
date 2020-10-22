const util = require('util');
const rewire = require('rewire');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const defaults = rewire('react-scripts/scripts/build.js'); // If you ejected, use this instead: const defaults = rewire('./build.js')
let config = defaults.__get__('config');

// console.log(config.optimization.minimizer[1]);
// console.log(util.inspect(config, false, null, true /* enable colors */))

config.optimization.splitChunks = {
	cacheGroups: {
		default: false,
	},
};

config.optimization.runtimeChunk = false;

config.output.filename = 'static/js/[name].js';
const plugin = config.plugins.filter((plugin) => (plugin instanceof MiniCssExtractPlugin));
if (plugin) plugin[0].options.filename = 'static/css/[name].css';
