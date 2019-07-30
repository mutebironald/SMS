//Deleting a contact removes the messages they sent and references to messages they received.
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactModel'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'ContactModel'},
    body: { type: String, required: true },
    status: { type: String, enum: ['sent', 'Draft', 'received' ], default: 'sent' },
});

MessageModelSchema.set('timestamps', true);

MessageModelSchema.plugin(uniqueValidator)

module.exports = mongoose.model('MessageModel', MessageModelSchema);
