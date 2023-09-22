const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Template Engine
const handlebars = exphbs.create({extname: ".hbs"});
app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");


const routes = require('./server/routes/students')
app.use('/', routes)


app.listen(PORT, ()=>{
    console.log(`Listening port on: ${PORT}`);
})