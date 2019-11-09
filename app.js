const express = require("express");
const app = express();

// you can optionally use handlebars
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, js

// enable use of json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/gradeQuiz", function (req, res) {
    let score = 0;
    let f1, f2, f3, f4, f5;
    f1 = f2 = f3 = f4 = f5 = "Wrong!";
    if (req.query.q1 == "sacramento") {
        score += 12.5;
        f1 = "You got it!";
    }
    if (req.query.q2 == "mo") {
        score += 12.5;
        f2 = "You got it!";
    }
    console.log("Value: " + req.query.q3);
    if (req.query.q3 == true) {
        score += 12.5;
        f3 = "You got it!";
    }
    if (req.query.q4 == "Rhode Island") {
        score += 12.5;
        f4 = "You got it!";
    }
    res.send({"score": score, "feedback1": f1, "feedback2": f2, "feedback3": f3, "feedback4": f4});
});

// running server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Express server is running...");
});

