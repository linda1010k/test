const express = require("express");
const firebase = require("firebase");
const Swal = require("sweetalert2");
var firebaseConfig = {
  apiKey: "AIzaSyB7FaqJO7ioGrBAw1pr6cFLjIkFEjLCjOc",
  authDomain: "firstproject-d9cc3.firebaseapp.com",
  databaseURL: "https://firstproject-d9cc3.firebaseio.com",
  projectId: "firstproject-d9cc3",
  storageBucket: "firstproject-d9cc3.appspot.com",
  messagingSenderId: "808170250991",
  appId: "1:808170250991:web:a08bdb4e3da6aa407cb11a",
  measurementId: "G-P6JJVM8SD9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("default");
});

// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });

app.get("/member", async (req, res) => {
  let data = await db.collection("classA").get();
  let userArr = [];
  data.forEach((doc) => {
    userArr.push({
      id: doc.id,
      name: doc.data().name,
      age: doc.data().age,
      gender: doc.data().gender,
    });
  });
  res.render("member", {
    users: userArr,
  });
});

app.get("/insert", (req, res) => {
  res.render("insert");
  db.collection("classA").add({
    name: req.query.name,
    age: req.query.age,
    gender: req.query.gender,
  });
  console.log("Insert successful");
});

app.get("/API/deleteMember", (req, res) => {
  db.collection("classA").doc(req.query.id).delete();
  console.log(req.query.id);
  res.send(`delete Member id = ${req.query.id}!`);
});

let port = process.env.PORT || 3000;
app.listen(port);
console.log("server running at port = ", port);
