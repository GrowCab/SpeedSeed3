// Sets up the mongoose connection and adds it to the app
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

module.exports = function(app) {
	let dbvals = {
		"test": process.env.DATABASE_TEST,
		"production": process.env.DATABASE_PROD
	};

	let backofftime = 0;
	let maxbackofftime = 10000;

	// Need to retry connection in case mongodb container is not ready.
	// See:
	// - https://github.com/Automattic/mongoose/issues/5169
	// - https://docs.docker.com/compose/startup-order/
	function createConnection(dbURL, options) {
		let connection_promise = mongoose.connect(dbURL, options);

		// Attempt to connect to the database. It may not be ready/accepting connections.
		connection_promise
			.then(function() {
				console.log("Connection to db established")
				app.locals.mongoose = mongoose;
				app.emit('mongo_ready')
			})
			.catch(function(err) {
				// If the database wasn't ready to accept connections
				// then kill the active connection requests from mongoose and retry
				console.log("Error connecting to database: " + err.stack);
			  mongoose.disconnect(function(err) {
					if(!err) {
						// Try reconnects with an increasing backofftime up to maxbackofftime
						if(backofftime < maxbackofftime) {
							backofftime += 500;
						}
						setTimeout(createConnection, backofftime, dbvals[process.env.NODE_ENV]);
					} else if(err) {
						console.log("Error in database connection setup, couldn't kill extra connections: " + err)
						process.exit(1)
					}
				})

			})
	};

	createConnection(dbvals[process.env.NODE_ENV]);
};
