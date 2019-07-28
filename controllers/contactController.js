const ContactModel = require('../models/contact') ;
const config = require('../database');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');


module.exports = {
    //get all contacts available
    getContacts: (req, res) => {
        ContactModel.find((err, contacts) => {
            if(err){ return res.status(400).json({ error: err});}
            res.status(200).json({ contacts });
        });
    },

    //get a specific contact
    // @param {id}
    getSpecificContact: (req, res) => {
        try{
            ContactModel.findById({ _id: req.params.id }, (err, contact) => {
                if(err){return res.status(400).json({ error: err });}
                if(!contact){ return res.status(400).json({error: 'Cannot find the contact specified'});}
                res.status(200).json({ contact });
            });
        } catch(error){
            res.status(400).json({ error: err });
        }
    },

    //add a contact to the database
    addContact: async (req, res) => {
        let errors = {};
        if(!req.body.name){ errors.name = 'A name is required';}
        if(!req.body.phone){ errors.phone = 'A phone is required';}
        if(!req.body.password){ errors.password = 'A password is required';} 
        if(Object.keys(errors).length>0){ return res.status(400).json({ errors });}
        try{
            var contact = new ContactModel(
                {
                    name: req.body.name,
                    phone: req.body.phone,
                    password: Bcrypt.hashSync(req.body.password, 10)
                });
            var result = await contact.save();
            res.json({ result });
        } catch(err){
            res.status(500).json({error: err });
        }
    },

    //login with your phone and password
    //it enables you send messages.
    login: (req, res) => {
        let errors = { };
        if(!req.body.phone){ errors.phone = 'A phone number is required';}
        if(!req.body.password){ errors.password = 'A password is required';}
        if(Object.keys(errors).length>0){ return res.status(400).json({ errors });}

        ContactModel.findOne({ phone: req.body.phone }).select('password').exec(function(err, contact){
            if(err){return res.status(400).json({ error: err });}
            if(!contact){res.status(400).json({ error: 'contact not found' });}
            const validPassword = contact.passwordVerification(req.body.password)            
            if(!validPassword){ res.status(400).json({ error: 'wrong password'});}
            const token = jwt.sign({
                id: contact._id,
                phone: req.body.phone,
            }, config.secret, {expiresIn:7890000});
            res.status(200).json({token: token});  
        })
        
    },

    //deletes a specific contact from the database
    deleteContact: (req,res) => {
        ContactModel.deleteOne({ _id: req.params.id }, (err, contact) => {
            if(err){return res.status(400).json({ error: err });}
            if(!contact){ return res.status(400).json({ error: 'contact not found'});}
            res.status(200).json({ message: 'Contact successfully deleted'})
        })
    }

}

