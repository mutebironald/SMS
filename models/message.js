//Deleting a contact removes the messages they sent and references to messages they received.
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

var uniqueValidator = require('mongoose-unique-validator');



var MessageModelSchema = new Schema({
    sender: { type: ObjectId, ref: 'ContactModel'},
    receiver: { type: ObjectId, ref: 'ContactModel'},
    body: { type: String, required: true },
    status: { type: String, enum: ['sent', 'Draft', 'received' ], default: 'sent' },
},{
    timestamps: { createdAt: true, updatedAt: false }
}
);


MessageModelSchema.plugin(uniqueValidator)

module.exports = mongoose.model('MessageModel', MessageModelSchema);
