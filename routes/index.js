const express = require('express');
const router = express.Router();
const winston 		= require('winston');
const winstonLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'console.log' })
    ]
  });
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/token', function(req, res, next) {
  winstonLogger.info("--- req.headers --- " + moment().format('Do MMMM YYYY, h:mm:ss a'));
  winstonLogger.info(req.headers);
  winstonLogger.info("--- req.body ---");
  winstonLogger.info(req.body);
  res.json({
  	message: 'Ok'
  });
});

module.exports = router;
