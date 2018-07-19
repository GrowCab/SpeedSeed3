module.exports = function(app) {
  console.log("Loading Settings API endpoints...");

  // Pull in our mongoose model so we can interact with it and the database.
  let SettingsModel = app.locals.mongoose.model('Settings');

  /**
    Return the most recent settings that have been applied to the system.
  */
  app.get('/settings', function(req, res) {
    let query = SettingsModel.findOne({}).sort({$natural: -1})
    query.exec(function(err, current_settings) {
      if(err) {
        res.status(500);
        res.json({
          error: err
        })
      } else {
        res.status(200);
        res.json(current_settings);
      }
    });
  });

  /**
    Update the system settings with new settings.

    req.body needs to conform to the schema specified in
    backend/schemas/Settings.js
  */
  app.post('/settings', function(req, res) {
    let settings = req.body;
    SettingsModel.create(new_settings, function(err, new_settings) {
      if(err) {
        res.status(500);
        res.json({
          error: err
        })
      } else {
        res.status(200);
        res.json(new_settings);
      }
    })
  })
}
