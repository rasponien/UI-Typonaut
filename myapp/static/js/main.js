/**
 * Created by carlcustav on 5/7/2017.
 */

$("#new-game").click(function () {
    $("#main-options").removeClass('fadeIn');
    $("#main-options").addClass('fadeOut');
    $("#main-options").hide();

    $(function () {
        $("#upper-half-circle").animate({
            margin: "0px auto"
        }, { duration: 400, queue: false });
        $("#lower-half-circle").animate({
            margin: "0px auto"
        }, { duration: 400, queue: false });
        $("#game-name").animate({
            padding: "60px 0 15px 0"
        }, { duration: 400, queue: false });
        $("#middle-part").show();
        $("#middle-part").animate({
            height: "300px"
        }, { duration: 400, queue: true });
        $("#register-form").animate({
            opacity: 1
        }, { duration: 1000, queue: true });




    });
});


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
        getResults(); // If user presses "enter", submit answer
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

            console.log(gameObject);
            clearInterval(interval);
        }
    }, 1000);
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
            console.log(response);
        }
    };
    console.log(param);
    console.log(param.data);
    $.ajax(param);
}