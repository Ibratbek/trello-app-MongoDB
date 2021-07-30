const mongoose= require('mongoose')

const columnSchema = mongoose.Schema({
    title: String
});

const Column = mongoose.model('Column',columnSchema);

module.exports = Column;
