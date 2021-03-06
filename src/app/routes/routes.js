
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Cords = require('../models/localizacion');

module.exports = (app,passport)=>{
  app.get('/',(req,res)=>{
    res.render('index');
  });

  app.get('/login', (req,res)=>{
    res.render('login',{
      message:req.flash('loginMessage')
    });
  });

  app.post('/login',passport.authenticate('local-login',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true
  }));

  app.get('/signup',(req,res)=>{
    res.render("signup",{
      message:req.flash("signupMessage")
    });
  });

  app.post('/signup',passport.authenticate('local-signup',{
    //Si se registra va a profile si no se va a signup otra vez
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
  }));

  app.get('/profile',isLoggedin,(req,res)=>{
    res.render('profile',{
      user: req.user
    });
  });

  app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  });

  app.get('/map',isLoggedin,(req,res)=>{
    res.render('map');
  });

  app.post('/map',isLoggedin,(req,res)=>{
    //console.log(req.body.latitud);
    var newcord = new Cords();
    newcord.name="1";
    newcord.longitud = req.body.longitud;
    newcord.latitud = req.body.latitud;
    newcord.save(function(err){
      if (err){
        throw err;
      }
      //return done(null,newcord);
    });
  });

  function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');

  }
};
