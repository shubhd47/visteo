const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Books = mongoose.Schema({
    id: {type:Number},
    name:{type: String},
    author:{type: String},
    isbn:{type:String}
})
Books.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});
module.exports = mongoose.model("book", Books)