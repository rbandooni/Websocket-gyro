
var socket = io.connect('http://192.168.1.37');

var logger = document.getElementById('logger');

function moveBox(data) {
  var box = document.getElementById('box');
  var transformstr = 'perspective(500px) rotateX('+data.z+'deg) rotateY('+data.x+'deg)';
  box.style.webkitTransform = transformstr;
  box.style.MozTransform = transformstr;
}

socket.on('connect', function () {
 
  logger.style.color = '#22d332';
 logger.innerText = 'connected';
 
  socket.on('movesquare', function(data) {
    //socket.emit('devicemove',data);
    moveBox(data);
  });
  socket.on('disconnect',function() {
    // visually disconnect
    logger.style.color = '#d31713';
    logger.innerText = 'disconnected';
  });
});

//var is_client = document.getElementById('is_client');

function handleOrientationEvent(z,x,o) {
  var data = {
    z: (Math.round(z))*10,
    x: (Math.round(x))*10,
    o: (Math.round(o))*10,
    
  };
  //alert(data.z);
    socket.emit('devicemove', data);
    moveBox(data);
 
}


jQuery(document).ready(function(){
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
$('#onDesk').hide();
$('#upload').hide();
$('#checkSize').html('<b>Great ! you are on a mobile device, use this to manipulate the image</b>');
if(window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function(event) {
    var rotateDegrees = event.alpha;
    //alert(rotateDegrees);
    var leftToRight = event.gamma;
    //alert(leftToRight);
    var frontToBack = event.beta;
    //alert(frontToBack);
    handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
  }, false);
}
}else{
$('#checkSize').html('<b>Use a mobile device with accelerometer to manipulate this image</b>');
}
 // var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
 //console.log('Width: '+width);
// var wd=parseInt(width);
 //console.log('Int' +wd);
 //if(wd >= 960){
 // document.getElementById('checkSize').innerHTML('Great ! you are on a desktop');
 //}
 //window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  //if(window.orientation !== 0){
 //document.getElementById('orient').innerHTML="<b>Please Use Portrait Mode</b>";
//}
//}, false);
//if(window.innerHeight > window.innerWidth){
  //   socket.emit('devicemove', data);
  //   moveBox(data);
//}
//document.querySelector('#fileSelect').addEventListener('click', function(e) {
  // Use the native click() of the file input.
  //document.querySelector('#fileElem').click(function(el){
    // edited//
    //socket.emit('handleForm',data);

  //});
//}, false);
$('#uploadDiv').css('display','none');
$('#upload').click(function(){

$('#uploadDiv').show();
$('#submit').click(function(e){

  var uname=$('#uname').val();
  var imURL='https://graph.facebook.com/'+uname+'/picture?type=large';
  socket.on('movesquare',function(data){
  socket.emit('changeImage', {imageurl: ''+imURL });
  });
  $('#box').css('background-image','url('+imURL+')');  
  //window.location.href="http://192.168.1.6:3000/";
  //++clientId;
  //include('http://localhost:3000')
  $('#uploadDiv').hide();
});




});

});