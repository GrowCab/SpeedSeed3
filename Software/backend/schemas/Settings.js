module.exports = function(app) {
  // Pull in the Schema class from mongoose.
  const Schema = app.locals.mongoose.Schema;
  // Set the name of the collection/schema for mongoose.
  const SchemaName = "Settings";

  // Schema for managing system temperature settings.
  let TemperatureSettingSchema = new Schema({
    start_hour: {
      type: Number,
      min: 0,
      max: 24
    },
    start_min: {
      type: Number,
      min: 0,
      max: 59
    },
    end_hour: {
      type: Number,
      min: 0,
      max: 24
    },
    end_min: {
      type: Number,
      min: 0,
      max: 59
    },
    max: Number
  })

  // Schema for managing system humidity settings.
  let HumiditySettingSchema = new Schema({
    start_hour: {
      type: Number,
      min: 0,
      max: 24
    },
    start_min: {
      type: Number,
      min: 0,
      max: 59
    },
    end_hour: {
      type: Number,
      min: 0,
      max: 24
    },
    end_min: {
      type: Number,
      min: 0,
      max: 59
    },
    max: Number
  })

  // Schema for managing system lighting schedule settings.
  let LightSettingSchema = new Schema({
    start_hour: {
      type: Number,
      min: 0,
      max: 24
    },
    start_min: {
      type: Number,
      min: 0,
      max: 59
    },
    end_hour: {
      type: Number,
      min: 0,
      max: 24
    },
    end_min: {
      type: Number,
      min: 0,
      max: 59
    },
    status: {
      type: Number,
      min: 0,
      max: 1
    }
  })

  // Schema for storing system settings.
  let SettingSchema = new Schema({
    temperature: [TemperatureSettingSchema],
    humidity: [HumiditySettingSchema],
    light: [LightSettingSchema],
    timestamp: {
      type: Date,
      default: Date.now
    }
  })

  // Create a model of this schema using our app's mongoose object.
  app.locals.mongoose.model(SchemaName, SettingSchema);
}
