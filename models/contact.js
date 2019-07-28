var mongoose = require('mongoose');




const Bcrypt = require('bcryptjs');
const MessageModel = require('./message');

var ContactModelSchema = mongoose.Schema({
    contact_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: Number, required: true, min: 10},
    password: { type: String, required: true },


    // message_id: { type: Number, required: true }
});


ContactModelSchema.methods.passwordVerification = function(password){
    return Bcrypt.compareSync(password, this.password);
  };

module.exports =  mongoose.model('ContactModel', ContactModelSchema);
