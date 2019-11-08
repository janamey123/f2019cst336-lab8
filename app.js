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



// running server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});

$(document).ready(function () {

    //Global Variables
    var score = 0;
    var allScores;

    if (window.localStorage) {
        allScores = [window.localStorage.getItem("allScores")] || [];
    } else {
        allScores = [parseInt($("#prevScores").html() || [])];
    }

    //event Listener
    //"Submit Quiz" button
    $("button").on("click", gradeQuiz);

    //Question 5 images
    $(".q5Choice").on("click", function () {
        $(".q5Choice").css("background", "");
        $(this).css("background", "rgb(255, 255, 0)");
    });

    displayQ4Choices();
    displayQ6Choices();

    //functions
    function displayQ4Choices() {
        let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
        q4ChoicesArray = _.shuffle(q4ChoicesArray);
        for (let i = 0; i < q4ChoicesArray.length; i++) {
            $("#q4Choices").append(`<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label>`);
        }
    }//displayQ4Choices

    function displayQ6Choices() {
        let q6ChoicesArray = ["Deep South", "Northeast", "Southwest", "Pacific Northwest"];
        q6ChoicesArray = _.shuffle(q6ChoicesArray);
        for (let i = 0; i < q6ChoicesArray.length; i++) {
            $("#q6Choices").append(`<input type="radio" name="q6" id="${q6ChoicesArray[i]}" value="${q6ChoicesArray[i]}"> <label for="${q6ChoicesArray[i]}">${q6ChoicesArray[i]}</label>`);
        }
    }// displayQ6Choices

    function isFormValid() {
        let isValid = true;
        if ($("#q1").val() == "") {
            isValid = false;
            $("#validationFdbk").html("Question 1 was not answered");
        }
        return isValid;
    }// isFormValid

    function rightAnswer(index) {
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success text-white");
        $(`#markImg${index}`).html("<img src='img/checkmark.png' alt='checkmark'>");
        score += 12.5;
    }// rightAnswer

    function wrongAnswer(index) {
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
        $(`#markImg${index}`).html("<img src='img/xmark.png' alt='xmark'>");
    }// wrongAnswer

    function gradeQuiz() {
        $("#validationFdbk").html(""); //resets validation feedback
        if (!isFormValid()) {
            return;
        }

        //variables
        score = 0;
        let q1Response = $("#q1").val().toLowerCase();
        let q2Response = $("#q2").val();
        let q4Response = $("input[name=q4]:checked").val();

        //Question 1
        if (q1Response == "sacramento") {
            rightAnswer(1);
        } else {
            wrongAnswer(1);
        }

        //Question 2
        if (q2Response == "mo") {
            rightAnswer(2);
        } else {
            wrongAnswer(2);
        }

        //Question 3
        if ($("#Jefferson").is(":checked") && $("#Roosevelt").is(":checked") && !$("#Jackson").is(":checked") && !$("#Franklin").is(":checked")) {
            rightAnswer(3);
        } else {
            wrongAnswer(3);
        }

        //Question 4
        if (q4Response == "Rhode Island") {
            rightAnswer(4);
        } else {
            wrongAnswer(4);
        }

        //Question 5
        if ($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
            rightAnswer(5);
        } else {
            wrongAnswer(5);
        }

        //Question 6
        if (q4Response == "Southwest") {
            rightAnswer(6);
        } else {
            wrongAnswer(6);
        }

        //Question 7
        if (q2Response == "vt") {
            rightAnswer(7);
        } else {
            wrongAnswer(7);
        }

        //Question 8
        if ($("#Yosemite").is(":checked") && $("#DeathValley").is(":checked") && $("#JoshuaTree").is(":checked") && !$("#MonumentValley").is(":checked") && !$("#Zion").is(":checked")) {
            rightAnswer(8);
        } else {
            wrongAnswer(8);
        }

        allScores.push(score);
        if (window.localStorage) {
            window.localStorage.setItem("allScores", allScores);
        }
        for (let i = 0; i < allScores.length; i++) {
            if (allScores[i] != null) {
                $("#prevScores").append(`${allScores[i]}  `);
            }
        }

        if (score < 80) {
            $("#totalScore").attr("class", "text-danger");
        } else {
            $("#totalScore").attr("class", "text-success");
        }
        if (score == 100) {
            $("#totalScore").html(`Congratulations! You reached a total score of ${score} points!`);
        } else {
            $("#totalScore").html(`Total Score: ${score}`);
        }
    }// gradeQuiz

})//ready