const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController')


//sends a message to a specific user
messageRouter
    .post('/send', messageController.sendMessage);

//gets all messages sent
messageRouter
    .get('/', messageController.getSentMessages);

messageRouter
    .get('/:sender_id', messageController.getSentMessage);

// messageRouter
//     .get('/received', messageController.getReceivedMessages);

//deletes messages.
messageRouter
    .delete('/:message_id', messageController.deleteMessage);





module.exports =  messageRouter;
