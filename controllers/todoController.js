var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:test@blah.mlab.com:234234/todo');

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
