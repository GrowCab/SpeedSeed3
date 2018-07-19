module.exports = function(app) {
  const Schema = app.locals.mongoose.Schema;

  // Schema for storing Error messages.
  let ErrorSchema = new Schema({
    error_type: {
      type: String,
      enum: ['Unknown command', 'Unable to parse data']
    },
    metadata: Schema.Types.Mixed,
    timestamp: Date
  })

  // Schema for storing Sensor Status data.
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
    timestamp: Date
  })

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
    timestamp: Date
  })

}
