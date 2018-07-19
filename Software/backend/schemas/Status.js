module.exports = function(app) {
  // Pull in the Schema class from mongoose.
  const Schema = app.locals.mongoose.Schema;
  // Set the name of the collection/schema for mongoose.
  const SchemaName = "Status";

  // Schema for storing Sensor and System Status data.
  let StatusSchema = new Schema({
    humidity: Number,
    temperature: Number,
    peltier_cool_status: Boolean,
    humidity_fan_status: Boolean,
    max_humidity: Number,
    max_tmp: Number,
    min_tmp: Number,
    light: Boolean,
    visible_lux: Number,
    missed_temp_reads: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  })

  // Create a model of this schema using our app's mongoose object.
  app.locals.mongoose.model(SchemaName, StatusSchema);
}
