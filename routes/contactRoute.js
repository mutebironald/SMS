const express = require('express');
const contactRouter = express.Router();
const jwt  = require('jsonwebtoken');
const config = require('../database');
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     description: Get all contacts
 *     content:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return saved contacts
 */
contactRouter
    .get('/', contactController.getContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *      tags:
 *         - Contacts
 *      description: This should add a contact
 *      content:
 *       - application/json
 *      parameters:
 *       - in: body
 *         name: user
 *         description: The user Object
 *         schema: 
 *              type: object
 *              properties:
 *                        name: 
 *                          type: String
 *                        phone: 
 *                          type: String
 *                        password: 
 *                          type: String
 *              example:
 *                      name: John
 *                      phone: 0778934276
 *                      password: Hanudsj5j#
 *         
 *      responses:
 *       201:
 *         description: Created
 */
contactRouter
    .post('/', contactController.addContact);


/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     description: Get a specific contact
 *     content:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: The contact id you want to retrieve
 *     responses:
 *       200:
 *         description: Return specific contact
 */
contactRouter
    .get('/:id', contactController.getSpecificContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     description: Delete a specific contact
 *     content:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: The contact id you want to delete or remove
 *     responses:
 *       200:
 *         description: The contact has been deleted
 */
contactRouter
    .delete('/:id', contactController.deleteContact);


/**
 * @swagger
 * /contacts/login:
 *   post:
 *      tags:
 *         - Contacts
 *      description: This should login with an already added contact. You should first add the contact
 *      content:
 *       - application/json
 *      parameters:
 *       - in: body
 *         name: user
 *         description: The user Object
 *         schema: 
 *              type: object
 *              properties:
 *                        name: 
 *                          type: String
 *                        phone: 
 *                          type: String
 *                        password: 
 *                          type: String
 *              example:
 *                      name: John
 *                      phone: 0778934276
 *                      password: Hanudsj5j#
 *         
 *      responses:
 *       201:
 *         description: successfully logged in
 */
contactRouter
    .post('/login', contactController.login);

contactRouter.use(function(req, res, next) {
        const token = req.headers['authorization'];
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

