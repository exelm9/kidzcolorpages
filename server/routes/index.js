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
  app.get('/api/', function(req, res){
    var data = {filters:['ninjas', 'animals', 'furrys'], 'pics': 'Fetched pics galore'}
  	res.send(JSON.stringify(data));
  })

  app.post('/api/search',function(req, res){
  	console.log(req.body)
  	res.send('pics galore');
  })
    
}


