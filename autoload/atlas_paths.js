const path = require('path');
/////////////////////////

// The absolute path to the root of this project.
module.exports._ATLAS_ = path.join(__dirname, '/../');
module.exports._APPS_  = path.join(__dirname, '/../applications');
module.exports._MEDIA_ = path.join(__dirname, '/../media');

// The absolute path to the Shared Document Root.
module.exports._DOC_ROOT = path.join( __dirname, '/../http_public');