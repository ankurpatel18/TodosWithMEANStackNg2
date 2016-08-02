var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://localhost:27017/meantodosapp', ['todos']);

/**********
    Start when  running on local
    // mongod --dbpath ./data/db 
    // mongo localhost:27017/meantodosapp
*/

//Get all Todos
router.get('/todos', function(req, res, next) {
    db.todos.find(function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }

    })
});

//Get single Todo
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});
//Save Todo
router.post('/todo/', function(req, res, next) {
    var todo = req.body;

    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(404);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;
    var updatedObj = {};

    if (todo.isCompleted) {
        updatedObj.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updatedObj.text = todo.text;
    }


    if (!updatedObj) {
        res.status(404);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updatedObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }

});

// Delete Todo
router.delete('/todo/:id', function(req, res, next) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;