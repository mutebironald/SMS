var mongoose = require('mongoose');
const MessageModel = require('../models/message');
const ContactModel = require('../models/contact');


module.exports = {

    //send a message to a particular contact
    sendMessage: (req, res) => {
        let errors = {};
        if(!req.body.receiver){ errors.receiver = 'No receiver specified'}
        if(!req.body.message){ errors.message = 'You must add a message to be sent, message body absent'}
        if(Object.keys(errors)>0){ return res.status(400).json({ errors })}

        ContactModel.findOne({phone: req.body.receiver}, (err, receiver) => {
            if(err){ return res.status(400).json({ error: err})}
            if(!receiver){ return res.status(400).json({ error: 'Cannot find the phone number specified. The contact should exist in the database first.' })}
            if( receiver._id === req.decoded.id){ return res.status(404).json({error: 'Woah!!! It seems you are attempting to send a message to yourself'})}
            const message = new MessageModel({
                sender: req.decoded.id,
                receiver: receiver._id,
                body: req.body.message
            });

            message.save((err, message) => {
                if(err){ return res.status(400).json({error: err})}
                return res.status(200).json({ message })
            });

        });
    },

    //gets all messages sent.
    getSentMessages: ( req, res) => {
        MessageModel.find({ sender: req.decoded.id })
        .populate('sender')
        .populate('receiver')
        .exec((err, messages) => {
            if(err){ return res.status(400).json({ error: err })}
            if(!messages){ return res.status(400).json({ error: 'You currently have not sent any messages yet.'})}
            return res.status(200).json({ messages })
        })
    },


    //gets a message sent by its id.
    getSentMessage: (req, res) => {
        try{
            if(mongoose.Types.ObjectId.isValid(req.params.message_id))
            MessageModel.findOne({ _id: req.params.message_id , sender: req.decoded.id})
            .populate('sender')
            .populate('receiver')
            .exec((err, message) => {
                if(err){ return res.status(400).json({error: err})}
                if(!message){ return res.status(404).json({ error: 'No message'})}
                return res.status(200).json({ message })
            })
            else{
                return res.status(404).json({ error: 'The id specified appears faulty'})
            }
        } catch(error){
            res.status(400).json({error: error })
        }        
    },


    //deletes a message from the database. This can be either sent messages or received messages.
    deleteMessage: (req, res) => {
        try{
            if(mongoose.Types.ObjectId.isValid(req.params.message_id))
            MessageModel
            .deleteOne({ _id: req.params.message_id }, 
                (err, message) => { 
                    if(err){ res.status(500).json({ error: err}) }
                    if(!message){ return response.status(404).json({ error: 'No message' })}  
                    return res.status(200).json({ message: 'The message is now deleted'})
            });
            else{
                return res.status(404).json({ error: 'The id specified appears faulty'})
            }
        } catch(error){
            res.status(400).json({error: error })
        }
    },

    //gets all received messages.
    getReceivedMessages: (req, res) => {
        MessageModel.find({ receiver: req.decoded.id})
        .populate('sender')
        .populate('receiver')
        .exec((err, messages) => {
            if(err){ return res.status(400).json({ error: err })}
            return res.status(200).json({ messages });
        })
        
    },

    //gets a specific message received.
    getReceivedMessage: (req, res) => {
        try{
            if(mongoose.Types.ObjectId.isValid(req.params.id))
            MessageModel.findOne({_id: req.params.id, receiver: req.decoded.phone})
            .populate('sender')
            .populate('receiver')
            .exec((err, message) =>{
                if(err){ return res.status(400).json({ error: err })};
                if(!message){ return res.status(400).json({error: 'Message not found'})}
                return res.status(200).json({ message })
            })
            else{
                return res.status(404).json({ error: 'The id specified appears faulty'})
            }
        } catch(error){
            res.status(400).json({error: error })
        }
        
    },
    
    

}
