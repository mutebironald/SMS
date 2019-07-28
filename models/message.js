//Deleting a contact removes the messages they sent and references to messages they received.
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactModel'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'ContactModel'},
    // message_id: mongoose.Schema.ObjectId,
    // sender_phone: { type:String, lowercase: true, trim: true , required: true },
    // receiver_phone: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ['sent', 'Draft', 'received' ], default: 'sent' },
});

MessageModelSchema.set('timestamps', true);

module.exports = mongoose.model('MessageModel', MessageModelSchema);
