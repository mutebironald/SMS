const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController')


//sends a message to a specific user
messageRouter
    .post('/send', messageController.sendMessage);


//gets a message sent based on its id(unique identifier)
messageRouter
    .get('/to/:message_id', messageController.getSentMessage);


messageRouter
    .get('/received', messageController.getReceivedMessages);

//deletes messages.
messageRouter
    .delete('/delete/:message_id', messageController.deleteMessage);


messageRouter
    .get('/received/:id', messageController.getReceivedMessage);

//gets all messages sent
messageRouter
    .get('/', messageController.getSentMessages);






module.exports =  messageRouter;
