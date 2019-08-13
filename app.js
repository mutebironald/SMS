var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const jwt = require('jsonwebtoken');

/**
 * setting up the routes
 */
const messageRouter = require('./routes/messageRoute');
const contactRouter = require('./routes/contactRoute');

//swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
    swaggerOptions: {
        validatorUrl: null,
        explorer: true,

      },
    info: {
        title: 'SMS Management API',
        version: '1.0.0',
        description: 'This is an SMS management Application',
    },
    host: `localhost:3000`,
    basePath: '/api/v1',
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        './routes/*.js', //a file with swagger specs written above each implementation 
        ],
};

// initialize swaggerJSDoc generator (outputs swagger docs as JSON to variable)
const specs = swaggerJsdoc(options);



/**
 * configuration setup
 */
const config = require('./database');

/**
 * connects to database
 */
const conn = require('./database/database');

conn.connect();


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


// Server swagger at <apiurl>/docs using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//define  contact route 
app.use('/api/v1/contacts', contactRouter);

app.use((req, res, next) => {
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


