const express = require("express");
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
var tasks = [];



//the data type that the body parser will parse
app.use(bodyParser.urlencoded({extended: false}));
//body parser json
app.use(bodyParser.json());
//allow app to see the contents of the public folder
app.use(express.static("public"));

//setting up the middleware: mustache
app.engine("mustache", mustacheExpress());
app.set("views","./views");
app.set("view engine", "mustache");

const todos = [
  "Wash the car",
  "Wash my hair",
  "Call Bae",
  "Mow the Lawn",
  "Trim hedges"
];

app.get("/", function (req, res) {
  res.render('submit', { todos: todos });
});

app.post("/", function (req, res) {
  todos.push(req.body.name);
  res.redirect('/');
  //console.log(req.body.name);
})

  app.listen(3000, function (){
  console.log("App is running");
});
