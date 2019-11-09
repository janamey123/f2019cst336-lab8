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
    let f1, f2, f3, f4, f5, f6, f7, f8;
    f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = "Wrong!";
    if (req.query.q1 == "sacramento") {
        score += 12.5;
        f1 = "You got it!";
    }
    if (req.query.q2 == "mo") {
        score += 12.5;
        f2 = "You got it!";
    }
    if (req.query.q3 == "true") {
        score += 12.5;
        f3 = "You got it!";
    }
    if (req.query.q4 == "Rhode Island") {
        score += 12.5;
        f4 = "You got it!";
    }
    if (req.query.q5 == "seal2") {
        score += 12.5;
        f5 = "You got it!";
    }
    if (req.query.q6 == "Southwest") {
        score += 12.5;
        f6 = "You got it!";
    }
    if (req.query.q7 == "vt") {
        score += 12.5;
        f7 = "You got it!";
    }
    if (req.query.q8 == "true") {
        score += 12.5;
        f8 = "You got it!";
    }
    res.send({
        "score": score,
        "feedback1": f1,
        "feedback2": f2,
        "feedback3": f3,
        "feedback4": f4,
        "feedback5": f5,
        "feedback6": f6,
        "feedback7": f7,
        "feedback8": f8
    });
});

// running server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Express server is running...");
});

