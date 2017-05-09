/**
 * Created by carlcustav on 5/7/2017.
 */



$(".btn.btn-play-more").click(function () {
    $("#results").removeClass("bounceInLeft");
    $("#results").addClass("bounceOutRight");
    startGame();
});

$(".btn.btn-main-page").click(function () {
    window.location.replace("http://127.0.0.1:8000");
});


$("#new-game").click(openRegistrationForm);

function openRegistrationForm() {

    // hide options - start game and highscores
    $("#main-options").hide();

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

    
    $("#middle-part").show();
    $("#middle-part").animate({
            height: "300px"
    }, { duration: 500, queue: true });
    setTimeout(function (){
        $("#register-form").animate({
            opacity: 1
    }, { duration: 600, queue: true });
    }, 400);


}



// game logic here
var startTime = 0;
var gameObject = {};
$("#namefield").keyup(function (e) {
    if (e.keyCode == 13){
        registerName();
    }
});
$("#answer").keydown(keypress);
function keypress(e) {
    if (e === undefined) return;
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode

        $("#game").removeClass("bounceInLeft");
        $("#game").addClass("bounceOutRight");
        setTimeout(function (){
            $("#game").hide();
            $("#game").addClass("bounceInLeft");
            $("#game").removeClass("bounceOutRight");

            $("#results").show();
            $("#results").removeClass("bounceOutRight");
            $("#results").addClass("bounceInLeft");

        }, 1000);
        getResults(); // If user presses "enter", submit answer
        $("#answer").val("");

    }
}
function registerName() {
    name = $("#namefield").val();
    name = name.length < 1? "Anonymous" : name;
    $("#messagebox").text("Your name is set as: " + name);
    $(".namecontainer").fadeOut();
    $("#messagebox").removeClass("hidden");

    setTimeout(function () {
        $("#messagebox").fadeOut();
        setTimeout(function (){
            $("#messagebox").addClass("hidden")
        }, 1000);
    },3000);
    startGame();

}
function startGame() {
    gameObject.name = name;
    $("#main-container").hide();
    $("game-container").hide();
    $('#game-timer').addClass("fadeIn")


    var counter = 3;
    $('#game-timer-container').show();
    $('#game-timer').addClass("animated fadeIn")
    var interval = setInterval(function() {
        counter--;

        $('#game-timer').text(counter);
        if (counter == 0) {
            // Display a login box
            $("#game-container").show();
            $('#game-timer').removeClass("fadeIn")
            $('#game-timer').addClass("fadeOut")
            $("#game").addClass("animated bounceInLeft");
            $("#game").show();
            setTimeout(function (){
                $('#game-timer').text(3);
            }, 500);
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
        $("#answer").focus();
        startTime = new Date().getTime();
    });



}
function getResults() {
    answer = $("#answer").val();
    time = (new Date().getTime() - startTime) / 1000;// time taken in sec
    param = {
        "url"   : "submit/",
        "method": "POST",
        "data"  : {
            "id"  : gameObject.quote.id,
            "answer"    : answer,
            "time"      : time,
            "name"      : gameObject.name
        },
        "success": function (response) {
            var textColor = "";
            var medalText = (response.medal == "None") ? "No" : response.medal;


            console.log(response);

            if (response.medal == "None") { textColor = "#999"; }
            if (response.medal == "Bronze") { textColor = "#cd7f32"; }
            if (response.medal == "Silver") { textColor = "silver"; }
            if (response.medal == "gold") { textColor = "gold"; }


            $("#medal").css("color",textColor);
            $("#medal").text(medalText + " medal!");
            $(".score").text("Your score: " + response.score);
            $(".score.bronze").text("Bronze score: " + response.bronze_score);
            $(".score.silver").text("Silver score: " + response.silver_score);
            $(".score.gold").text("Gold score: " + response.gold_score);

        }
    };
    console.log(param.data);
    $.ajax(param);
}