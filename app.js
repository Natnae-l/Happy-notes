require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')

// create express app
const app = express();
const port = 5001 || process.env.PORT;


// connect to mongoDB and start express server
mongoose.connect(process.env.mongoDB)
    .then(() => {
        app.listen(port, () => console.log(`app listening on port: ${port}`));
    })
    .catch(err => console.log(err))


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );


//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())



// static files
app.use(express.static('public'))

//templating engine
app.use(expressLayouts)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/index'))
app.use('/', require('./routes/dashboard'))

//handle 404

app.get('*', (req, res, next) => {
    res.render('404')
})