/**
 * Created by carlcustav on 5/7/2017.
 */

var startTime = 0;
var gameObject = {};


// first game user story
$("#new-game").click(openRegistrationForm);
$("#namefield").keyup(enterRegisteredName);
$("#answer").keydown(enterWrittenText);

// options after first game
$(".btn.btn-play-more").click(returnToGame);
$(".btn.btn-main-page").click(returnToMainMenu);





function returnToGame() {
    $("#results").removeClass("bounceInLeft");
    $("#results").addClass("bounceOutRight");
    startGame();
}

function returnToMainMenu() {
    window.location.replace("http://127.0.0.1:8000");
}

function openRegistrationForm() {

    // hide options - start game and highscores
    $("#main-options").hide();
    $("#middle-part").show();

    // slide upper half-circle up and lower half-circle down
    $("#upper-half-circle").animate({
        margin: "0px auto"
    }, { duration: 500, queue: false });
    $("#lower-half-circle").animate({
        margin: "0px auto"
    }, { duration: 500, queue: false });

    // slide game-name down (Typonaut)
    $("#game-name").animate({
        padding: "60px 0 15px 0"
    }, { duration: 500, queue: false });

    // show registration form
    $("#middle-part").animate({
            height: "300px"
    }, { duration: 500, queue: false });
    setTimeout(function (){
        $("#register-form").animate({
            opacity: 1
        }, { duration: 600, queue: true });
    }, 400);
}


function enterRegisteredName(e) {
    if (e === undefined) return;
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13){
        registerName();
    }
}

function enterWrittenText(e) {
    if (e === undefined) return;
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode

        //slide game div out of the window
        $("#game").removeClass("bounceInLeft");
        $("#game").addClass("bounceOutRight");

        setTimeout(function (){

            //hide game and add bounceInLeft class for the next round
            $("#game").hide();
            $("#game").removeClass("bounceOutRight");
            $("#game").addClass("bounceInLeft");

            //show results and add bouncInLeft class for the next round
            $("#results").show();
            $("#results").removeClass("bounceOutRight");
            $("#results").addClass("bounceInLeft");

        }, 700);
        getResults();
        $("#answer").val("");
    }
}

function registerName() {
    name = $("#namefield").val();
    gameObject.name = name.length < 1? "Anonymous" : name;
    startGame();

}

function startGame() {
    gameObject.name = name;

    $("#main-container").hide();
    $("game-container").hide();
    $('#game-timer-container').show();

    var counter = 3;
    var interval = setInterval(function() {

        counter--;
        $('#game-timer').text(counter);

        if (counter == 0) {

            $('#game-timer').removeClass("fadeIn")
            $('#game-timer').addClass("fadeOut")
            setTimeout(function (){ $('#game-timer-container').hide(); }, 1000);

            $("#game-container").show();
            $("#game").show();

            //set timer back to default
            setTimeout(function (){ $('#game-timer').text(3); }, 500);

            $("#answer").focus();
            startTime = new Date().getTime();
            clearInterval(interval);
            
        }
    }, 1000);
    
    $('#game-timer').removeClass("fadeOut")
    gameUrl = "getquote";
    jQuery.get(gameUrl, function(response){
        console.log(response);
        gameObject.quote = response;
        $("#gamecontent").removeClass("hidden");
        $("#quote").text('"' + gameObject.quote.quote + '"');
        $("#author").text('- ' + gameObject.quote.author);
    });
    $('#answer').focus()


}

function getResults() {
    answer = $("#answer").val();
    time = (new Date().getTime() - startTime) / 1000;// time taken in sec
    parameters = {
        "url"   : "submit/",
        "method": "POST",
        "data"  : {
            "id" : gameObject.quote.id,
            "answer" : answer,
            "time" : time,
            "name" : gameObject.name
        },
        "success": function (response) {
            var textColor = "";
            var medalText = (response.medal == "None") ? "No" : response.medal;

            if (response.medal == "None") { textColor = "#999"; }
            if (response.medal == "Bronze") { textColor = "#cd7f32"; }
            if (response.medal == "Silver") { textColor = "silver"; }
            if (response.medal == "gold") { textColor = "gold"; }

            //set results
            $("#medal").css("color", textColor);
            $("#medal").text(medalText + " medal!");
            $(".score").text("Your score: " + response.score);
            $(".score.bronze").text("Bronze score: " + response.bronze_score);
            $(".score.silver").text("Silver score: " + response.silver_score);
            $(".score.gold").text("Gold score: " + response.gold_score);


        }
    };
    $.ajax(parameters);
}
