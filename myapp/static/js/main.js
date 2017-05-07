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
        }, { duration: 200, queue: false });

        $("#lower-half-circle").animate({
            margin: "0px auto"
        }, { duration: 200, queue: false });

        $("#middle-part").show();
        $("#middle-part").animate({
            height: "300px"
        }, { duration: 600, queue: false });
    });
});