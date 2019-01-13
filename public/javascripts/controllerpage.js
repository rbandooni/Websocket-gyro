var clientId = 1;
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

// Launch fullscreen for browsers that support it!

$(document).ready(function(){
    launchFullScreen(document.documentElement); // the whole page
$('#submit').click(function(e){

  var uname=$('#uname').val();
  var imURL='https://graph.facebook.com/'+uname+'/picture?type=large';

  $('#box').css('background-image','url('+imURL+')');  
  //window.location.href="http://192.168.1.6:3000/";
  //++clientId;
  //include('http://localhost:3000')
});

});