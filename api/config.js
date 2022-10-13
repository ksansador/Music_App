const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/music',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '415777350715756',
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
  google: {
    clientId: '192937486511-n94jdchv168745rao7of50a744p1keue.apps.googleusercontent.com',
  }
};