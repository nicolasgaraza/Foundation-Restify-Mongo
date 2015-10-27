/*

	TODO Controller

*/

var mongoose = require('mongoose'),
    Todo = mongoose.model("Todo"),
    ObjectId = mongoose.Types.ObjectId;

exports.createTodo = function(req, res, next){
    console.log(req.body);
	var TodoModel = new Todo(JSON.parse( req.body));
    TodoModel.save(function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: User
            })
        }
    });
}

exports.getTodos =function(req, res, next){
    console.log("called");
	Todo.find({}, function(err, todos) {

    if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: todos
            })
        }
  });
}