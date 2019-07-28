const MessageModel = require('../models/message');
const ContactModel = require('../models/contact');

module.exports = {
    sendMessage: (req, res) => {
        let errors = {};
        if(!req.body.phone){ errors.phone = 'No receiver specified'}
        if(!req.body.text){ errors.text = 'You must add text to be sent, message body absent'}
        if(Object.keys(errors)>0){ return res.status(400).json({ errors })}

        ContactModel.findOne({phone: req.body.phone}, (err, phone) => {
            if(err){ return res.status(400).json({ error: err})}
            if(!phone){ return res.status(400).json({ error: 'Cannot find the phone number specified' })}
            if( req.body.phone === req.decoded.phone){ return res.status(404).json({error: 'Woah!!! It seems you are attempting to send a message to yourself'})}

            const message = new MessageModel({
                sender_phone: req.decoded.phone,
                receiver_phone: req.body.phone,
                body: req.body.text
            });

            message.save((err, message) => {
                if(err){ return res.status(400).json({error: err})}
                return res.status(200).json({ message })
            });

        });
    },

    getSentMessages: ( req, res) => {
        MessageModel.find({sender: req.decoded.contact_id})
        .populate('sender')
        .populate('receiver')
        .exec((err, messages) => {
            if(err){ return res.status(400).json({ error: err })}
            if(!messages){ return res.status(400).json({ error: 'You currently have not sent any messages yet.'})}
            return res.status(200).json({ messages })
        })
    },


    getSentMessage: (req, res) => {
        MessageModel.findOne({ message_id: req.params.id , sender: req.decoded.contact_id})
        .populate('sender')
        .populate('receiver')
        .exec((err, message) => {
            if(err){ return res.status(400).json({error: err})}
            if(!message){ return res.status(404).json({ error: 'No message'})}
            return res.status(200).json({ message })
        })
    },


    deleteMessage: (req, res) => {
        MessageModel
        .deleteOne({ message_id: req.params.id }, 
            (err, message) => { 
                if(err){ res.status(500).json({ error: err}) }
                if(!message){ return response.status(404).json({ error: 'No message' })}  
                return res.status(200).json({ message: 'The message is now deleted', message: message })
            });
    },

    getReceivedMessages: (req, res) => {
        MessageModel.find({ phone: req.decoded.phone})
        .populate('sender')
        .populate('receiver')
        .exec((err, messages) => {
            console.log(messages, 'messages');
            if(err){ return res.status(400).json({ error: err })}
            return res.status(200).json({ messages });
        })
        
    },
    getReceivedMessage: (req, res) => {
        MessageModel.findOne({message_id: req.params.id, phone: req.decoded.phone})
        .populate('sender')
        .populate('receiver')
        .exec((err, message) =>{
            if(err){ return res.status(400).json({ error: err })};
            if(!message){ return res.status(400).json({error: 'Message not found'})}
            return res.status(200).json({ message })
        })
    },
    
    

}
