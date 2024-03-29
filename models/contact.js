var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const Bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');


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


var ContactModelSchema = Schema({
    name: { type: String, required: true, validate: nameValidate, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },

});


ContactModelSchema.methods.passwordVerification = function(password){
    return Bcrypt.compareSync(password, this.password);
};

ContactModelSchema.plugin(uniqueValidator);

module.exports =  mongoose.model('ContactModel', ContactModelSchema);
