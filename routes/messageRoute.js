const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController')



messageRouter
    .post('/send', messageController.sendMessage);

messageRouter
    .get('/', messageController.getSentMessages);

messageRouter
    .get('/:sender_id', messageController.getSentMessage);

messageRouter
    .get('/received', messageController.getReceivedMessages);

messageRouter
    .delete('/:message_id', messageController.deleteMessage);





module.exports =  messageRouter;
