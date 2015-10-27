var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var TodoSchema = new Schema({
    text: String,
    desc: String
});
mongoose.model('Todo', TodoSchema);
console.log('Registered')