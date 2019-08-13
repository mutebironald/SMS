const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController')


//sends a message to a specific user
/**
 * @swagger
 * /messages/send:
 *   post:
 *      tags:
 *         - Messages
 *      description: This should send a message to a user
 *      content:
 *       - application/json
 *      parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       - in: body
 *         name: message
 *         description: The message Object
 *         schema: 
 *              type: object
 *              properties:
 *                       receiver: 
 *                          type: String
 *                       message: 
 *                          type: String
 *              example:
 *                      receiver: 0772345673
 *                      message: Hello there
 *         
 *      responses:
 *       201:
 *         description: The message has been sent
 */
messageRouter
    .post('/send', messageController.sendMessage);


//gets a message sent based on its id(unique identifier)
/**
 * @swagger
 * /messages/to/{id}:
 *   get:
 *     tags:
 *       - Messages
 *     description: Gets a particular message sent to a user based on its id
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       -  in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: The message id you want to retrieve
 *     responses:
 *       200:
 *         description: Return messages sent to a particular user
 */
messageRouter
    .get('/to/:message_id', messageController.getSentMessage);


/**
 * @swagger
 * /messages/received:
 *   get:
 *     tags:
 *       - Messages
 *     description: Get all Received messages
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *     responses:
 *       200:
 *         description: Return messages sent to a particular user
 */
messageRouter
    .get('/received', messageController.getReceivedMessages);



/**
 * @swagger
 * /messages/delete/{id}:
 *   delete:
 *     tags:
 *       - Messages
 *     description: Delete a specific message
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: The message id you want to delete or remove
 *     responses:
 *       200:
 *         description: The message has been deleted
 */
messageRouter
    .delete('/delete/:message_id', messageController.deleteMessage);


/**
 * @swagger
 * /messages/received/{id}:
 *   get:
 *     tags:
 *       - Messages
 *     description: Gets a particular message based on its id
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       -  in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: The message id you want to retrieve
 *     responses:
 *       200:
 *         description: Return messages sent by a particular user
 */
messageRouter
    .get('/received/:id', messageController.getReceivedMessage);


/**
 * @swagger
 * /messages:
 *   get:
 *     tags:
 *       - Messages
 *     description: Get all sent messages
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *     responses:
 *       200:
 *         description: Return messages sent by a particular user
 */
messageRouter
    .get('/', messageController.getSentMessages);






module.exports =  messageRouter;
