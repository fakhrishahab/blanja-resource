const path = require('path');

module.exports = {
	NODE_ENV: "development",
	PORT_STATIC: 4040,
	PORT_TEMPLATE : 4000,

	build: {
		sourceMap : true,
		compressionGzip : true,
		compressionGzipExt : ['js', 'css'],
		devPath : path.resolve(__dirname, '../dev'),
		distPath : path.resolve(__dirname, '../dist')
	}
}