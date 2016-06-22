const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cnfg = require(path.join(__dirname, '../config'))
/////////////////////////

module.exports = function(app, express){

  // Static routes
  app.use(express.static(cnfg.paths._DOC_ROOT));
  // Parse request body (add multer or busboy if want to handle multipart form data)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Module routes
  app.get('/test', function(req, res){
  	res.send('Fetched pics galore');
  })

  app.post('/test',function(req, res){
  	console.log(req.body)
  	res.send('pics galore');
  })
    
}


