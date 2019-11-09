const express = require("express");
const app = express();

const question1 = false;

// you can optionally use handlebars
app.set("view engine", "ejs");

app.use(express.static("public")); //access images, css, js

// enable use of json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.get("/", function(req, res){

    res.render("index");

} );

// Step 4. Process the quiz and return the original along with
// the answer related information. (Though, probably don't need original
// because the page was never left and still has the answers.)
app.post("/", function(req, res){

    var q1 = req.questions.question1;
    console.log(q1);
    //req.questions["1"];

    gradeQuiz();

    res.json({
        answers: [
            {
                question: 1,
                correct: true,
            }
        ],
        original: req.body
    })

} );

function gradeQuiz() {

} // gradeQuiz()


// running server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});

