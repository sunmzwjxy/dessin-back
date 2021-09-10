// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


module.exports = function (app) {
  app.use('/users', require('./users.js'))
  app.use('/data', require('./data.js'))
  // app.use("/api/addresses", require("./address.js"));
  // app.use("/api/loginInfos", require("./loginInfo.js"));
  // app.use("/api/roles", require("./role.js"));
}
