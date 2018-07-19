module.exports = function(app) {
  console.log("Loading Settings API endpoints...");

  // Pull in our mongoose model so we can interact with it and the database.
  let SettingsModel = app.locals.mongoose.model('Status');

  /**
    Return the system status timeline sorted in descending order by time.
  */
  app.get('/status', function(req, res) {
    let query = SettingsModel.find({}).sort({$natural: -1})
    query.exec(function(err, system_statuses) {
      if(err) {
        res.status(500);
        res.json({
          error: err
        })
      } else {
        res.status(200);
        res.json(system_statuses);
      }
    });
  });

}
