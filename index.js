const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
var methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
let id_var = 1;
let posts = [
  {
    id: "1",
    username: "Ahmad",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus porro officiis ratione perspiciatis eius quam labore modi nulla assumenda? ",
    time: "1:52:29 PM",
  },
];
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts/new", (req, res) => {
  const Time = new Date().toLocaleTimeString();
  req.body.time = Time;
  ++id_var;
  req.body.id = id_var.toString();
  posts.push(req.body);
  console.log(posts);

  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show", { post });
});
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  let post = posts.find((p) => p.id === id);
  post.content = content;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("Server Started");
});
