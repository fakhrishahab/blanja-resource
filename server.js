import express from 'express';
import indexRouting from './routes/index';

var server = 
	express()
		.set('view engine', 'ejs')
		.use(express.static('./dist'))
		.set('views', './views/layouts')
		.use(indexRouting)
		.listen(3000, function(){
			console.log('Server listen on Port 3000')
		})

module.exports = server;