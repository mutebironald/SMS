var mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const MessageModel = require('./message');

var checkNameLength = (name) => {
    if(!name){return false}
    if(name.length<2|| name.length>17){return false}
    return true
}

var matchNameString = (name) => {
    if(!name){return false}
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    return regExp.test(name);
}

var nameValidate = [
    { validator: checkNameLength, message: 'The length of the name should be between 2 and 17 characters'},
    { validator: matchNameString, message: 'Ensure there are no special characters in the name'}
]

var phoneCheck = (phone) => {
    if(!phone){ return false }
    const regExp = new RegExp(/^0\d{9}$/);
    return regExp.test(phone);
}

var phoneValidate = [
    { validator: phoneCheck, message: 'The phone should have 10 digits'}
]

var passwordCheck = (password) => {
    if(!password){ return false }
    if(password.length>10 || password.length <10){ return false }
    return true;
}

var passwordValidate = [
    { validator: passwordCheck, message: 'The password provided should be 10 characters long'}
]

var ContactModelSchema = mongoose.Schema({
    contact_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, validate: nameValidate },
    phone: { type: Number, required: true, min: 10, validate: phoneValidate },
    password: { type: String, required: true, validate: passwordValidate },

});


ContactModelSchema.methods.passwordVerification = function(password){
    return Bcrypt.compareSync(password, this.password);
};


module.exports =  mongoose.model('ContactModel', ContactModelSchema);
