(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {
  $("#year").text((new Date).getFullYear());
  $('.modal').modal();
  $('#textarea1').trigger('autoresize');
});