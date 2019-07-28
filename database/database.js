//Please include a writeup explaining why you chose that data store & framework.

//ease of use, support by the community,  learning curve, performance, ease of replication/backup , 


var mongoose =  require('mongoose');

// var mongoDB = 'mongodb://127.0.0.1/sms_api';
// mongoose.connect(mongoDB, { useNewUrlParser: true });

// var db = mongoose.Connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error' ));

const Mockgoose = require('mockgoose').Mockgoose;
const database = require('./index');

/**
 * helps to connect the system to the database, provides success message when database is connected
 *  and error message when a connection is unsuccessful 
 */
function configureDatabase() {
    mongoose.connect('mongodb://127.0.0.1/sms_api', {useNewUrlParser: true, useCreateIndex: true });
    // mongoose.connect(database.uri, {useNewUrlParser: true, useCreateIndex: true });

    db = mongoose.connection;
    db.on('connection', function(){
        console.log('Your connection to smsAPi is now active');
    });

    db.on('error', 
        console.error.bind(console, 'MongoDb connection error')
    )
}


/**
 * wraps Mockgoose around mongoose and changes connection depending on current database.
 * Ideally, it will connect to a different database in testing and development.
 */
function connect(){
    if(process.env.NODE_ENV === 'testing'){
        const mockgoose = new Mockgoose(mongoose);
        return mockgoose.prepareStorage()
        .then( () => {
            configureDatabase()
        })
    } configureDatabase()
}

module.exports = { connect }
