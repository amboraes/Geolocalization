var express = require('express');
var app = express();

app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {
  res.send("Hi");
});

app.listen(app.get('port'),function(err, response){
  console.log("Server running on port ", app.get('port'));
});
