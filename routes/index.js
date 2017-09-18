import express from 'express';

let route = express.Router();

route
	.get('/', function(req, res, next){
		res.render('index',{
			logo :'Blanja'
		});
	})

module.exports = route;