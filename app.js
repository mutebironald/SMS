var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const jwt = require('jsonwebtoken')

/**
 * configuration setup
 */
const config = require('./database');

/**
 * connects to database
 */
const conn = require('./database/database');

conn.connect();

/**
 * setting up the routes
 */
const messageRouter = require('./routes/messageRoute');
const contactRouter = require('./routes/contactRoute');

var app = express();

app.use(cors());
// match only json type body
app.use(bodyParser.json({ inflate: true }));

//allow array/string parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app
.get('/', (req, res) => {
    return res.send('This is a Message management API, have fun with it')
});

//define  contact route 
app.use('/api/v1/contacts', contactRouter);

app.use((req, res, next) => {
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers['authorization'];
    if(!token){
        res.status(400).json({error: 'You are not authorized'})
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            console.log(err, 'error');
            res.status(400).json({ error: 'Invalid token'})
        }
        req.decoded = decoded;
        next();
    });
});

//define message route
app.use('/api/v1/messages', messageRouter);


module.exports = app;


