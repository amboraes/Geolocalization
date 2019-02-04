var express = require('express');
var app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');

mongoose.connect(url,{
  useNewUrlParser: true
  //useMongoClient: true
});

require('./config/passport')(passport);

//Settings
app.set('port', process.env.port || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


//Middleware
app.use(morgan('dev'));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:false}));
app.use(session({
  secret:'topicostelematica',
  resave: false,
  saveUnitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//routes
require('./app/routes/routes')(app,passport);

//static files
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), function(err, response) {
  console.log("Server running on port ", app.get('port'));
});
