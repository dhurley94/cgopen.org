(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$("#year").text((new Date).getFullYear());
$(document).ready(function () {
  $('.modal').modal();
});