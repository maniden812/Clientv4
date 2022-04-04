const mysql = require("mysql");

var db_config = {
	host: process.env.DB_HOST,
    database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	
};

var connection;

function handleDisconnect() {
	connection = mysql.createConnection(db_config); 	
														
	connection.connect(function (err) {              	
		if (err) {                                     	
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000); 		
		} else {
			console.log('connected');
		}                                    			
	});                                     			
														
	connection.on('error', function (err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	
			handleDisconnect();                         
		} else {                                      	
			throw err;                                  
		}
	});
}

handleDisconnect();

module.exports = connection;