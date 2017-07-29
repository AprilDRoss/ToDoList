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

var tasksCompleted = [];

app.get("/", function (req, res) {
  res.render('submit', {todos: todos, tasksCompleted:tasksCompleted });
});

app.post("/", function (req, res) {
  if(req.body.todo){
  todos.push(req.body.todo);
  res.redirect('/');
} else {
  todos.splice(todos.indexOf(req.body.incomplete),1);
  tasksCompleted.push(req.body.incomplete);
  res.redirect("/");
}
  //console.log(req.body.name);
});

  app.listen(3000, function (){
  console.log("App is running");
});
