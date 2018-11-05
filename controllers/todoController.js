var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://authuser1:authuser1pass@ds151513.mlab.com:51513/gagantest1');
//var data = [{item: 'get milk'}, {item: 'go for a walk'}, {item: 'sleep'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy clothes'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

module.exports = function(app){
    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });

    });

    app.post('/todo', urlencodedParser, function(req, res){
        var newTodo = new Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};
