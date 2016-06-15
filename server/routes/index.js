const fs = require('fs');
const path = require('path');
const cnfg = require(path.join(__dirname, '../config'))
/////////////////////////

module.exports = function(app, express){

  // Static routes
  app.use(express.static(cnfg.paths._DOC_ROOT));
  // Module routes
  app.get('/', function(req, res){
  	res.send('Hi there');
  })
    
}


