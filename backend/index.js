var express = require('express');
var app = express();

app.set('port',process.env.port || 3000);

app.listen(app.get('port'));
