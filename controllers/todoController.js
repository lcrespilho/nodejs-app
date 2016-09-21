var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:test@ds035826.mlab.com:35826/alsdkfj');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schame({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
  if (err) {
    console.log(err.message);
    throw err;
  }
  console.log('item saved');
});

var data = [
  {item: 'get milk'},
  {item: 'walk dog'},
  {item: 'kick some coding ass'}
];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  app.get('/todo', (req, res) => {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', (req, res) => {
    data = data.filter(x => x.item.replace(/ /g, '-') !== req.params.item);
    res.json(data);
  });
};
