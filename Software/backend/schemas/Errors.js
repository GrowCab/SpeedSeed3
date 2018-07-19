module.exports = function(app) {
  // Pull in the Schema class from mongoose.
  const Schema = app.locals.mongoose.Schema;
  // Set the name of the collection/schema for mongoose.
  const SchemaName = "Errors";

  // Schema for storing Error messages.
  let ErrorSchema = new Schema({
    error_type: {
      type: String,
      enum: ['Unknown command', 'Unable to parse data']
    },
    metadata: Schema.Types.Mixed,
    timestamp: {
      type: Date,
      default: Date.now
    }
  })

  // Create a model of this schema using our app's mongoose object.
  app.locals.mongoose.model(SchemaName, ErrorSchema);
}
