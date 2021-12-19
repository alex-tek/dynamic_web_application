const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    rsvp:  {type: String, required: [true, 'RSVP is required']},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required']},
    meet: {type: Schema.Types.ObjectId, ref: 'Meet', required: [true, 'Meet is required']}
}, {timestamps:true});

module.exports = mongoose.model('Rsvp', rsvpSchema);