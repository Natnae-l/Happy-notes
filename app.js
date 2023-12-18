require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// create express app
const app = express();
const port = 5001 || process.env.PORT;

// create express server
app.listen(port, () => console.log(`app listening on port: ${port}`));

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// static files
app.use(express.static('public'))

//templating engine
app.use(expressLayouts)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/index'))