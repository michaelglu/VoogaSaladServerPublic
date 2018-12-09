/**
@author Michael Glushakov
Main script from which all routes are managed
*/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//Destructuring is considered good practice in Javascript (only use things you'll need)
const { mongoose } = require("./config/mongoose");
const {
  createUser,
  login,
  updateUser,
  findUsers,
  followUser
} = require("./routes/user-routes.js");
app.use(bodyParser.json());
//Home screen used for testing
app.get("/", (req, res) => {
  res.send("/createuser to create user /login to login");
});
// Create user HTTP POST route
app.post("/createuser", (req, res) => {
  createUser(req.body.user).then(
    success => {
      res.send(success);
    },
    error => {
      res.status(400);
      res.send(error);
    }
  );
});
// login user HTTP PUT route
app.put("/login", (req, res) => {
  login(req.body.user).then(
    success => {
      res.send(success);
    },
    error => {
      res.send(error);
    }
  );
});
// updateProfile user HTTP PUT route
app.put("/updateProfile", (req, res) => {
  updateUser(req.body.user).then(
    success => {
      res.send(success);
    },
    error => {
      res.status(400);
      res.send(error);
    }
  );
});
// follow HTTP PUT route
app.put("/follow", (req, res) => {
  followUser(req.body).then(
    success => res.send(success),
    err => {
      res.status(400);
      res.send(err);
    }
  );
});
// find users HTTP GET route
app.get("/findUsers", (req, res) => {
  findUsers(req.header("name")).then(
    users => res.send(users),
    err => {
      res.status(400);
      res.send(err);
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on 3000");
});
