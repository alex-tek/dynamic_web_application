const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetSchema = new Schema({
    topic: {type: String, required: [true, 'Topic is required']},
    title: {type: String, required: [true, 'Title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    where: {type: String, required: [true, 'Where is required']},
    when: {type: String, required: [true, 'Date is required']},
    start: {type: String, required: [true, 'Start time is required']},
    end: {type: String, required: [true, 'End time is required']},
    details: {type: String, required: [true, 'Details is required'],
    minLength: [10, 'The details should have at least 10 characters']},
    image: {type: String, required: [true, 'Image is required'], unique: true},
});





meetSchema.statics.getTopics = (meets) => {
    let array = [];
    for (i = 0; i < meets.length; i++) {

        if (!array.includes(meets[i].topic)){
            array.push(meets[i].topic);
        }
    
      //  console.log(meets[i].topic);

}
    return array;
}


// collection name is meets in the database
module.exports = mongoose.model('Meet', meetSchema);

