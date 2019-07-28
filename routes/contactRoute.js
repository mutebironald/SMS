const express = require('express');
const contactRouter = express.Router();
const jwt  = require('jsonwebtoken');
const config = require('../database');
const contactController = require('../controllers/contactController');


contactRouter
    .get('/', contactController.getContacts);


contactRouter
    .post('/', contactController.addContact);

contactRouter
    .get('/:id', contactController.getSpecificContact);

contactRouter
    .delete('/:id', contactController.deleteContact);


contactRouter
    .post('/login', contactController.login);

contactRouter.use(function(req, res, next) {
        const token = req.headers['token-x'];
        if(!token){
            res.status(400).json({ error: 'No token available'});
        }else{
        jwt.verify(token, config.secret, function(err, decoded){
            if(err){ res.status(400).json({ token: false, error: 'Invalid token'})}
            else{
                req.decoded = decoded;
                next();
            }
            
        });
    }
});


module.exports = contactRouter;

