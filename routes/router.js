// main router
module.exports = function (app) {
  // all the router files should be registered here
  app.use('/'          , require('./index')    );      // index page
  app.use('/upload'    , require('./upload')   );      // upload API
}
