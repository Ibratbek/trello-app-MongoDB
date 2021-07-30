const mongoose= require('mongoose')

const cardSchema = mongoose.Schema({
    content: String,
    id: String,
    users: [String],
    description:String,
    comments: [Object]
});

const Card = mongoose.model('Card',cardSchema);

module.exports = Card;
