const express = require("express");
const app = express();

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

    log.console(res);

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

// running server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});

