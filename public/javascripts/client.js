
var socket = io.connect("https://gyrosocket-c9-rbandooni.c9.io/");

//var logger = document.getElementById('status');

function moveBox(data) {
  var box = document.getElementById('box');
  var transformstr = 'perspective(500px) rotateX('+data.z+'deg) rotateY('+data.x+'deg)';
  box.style.webkitTransform = transformstr;
  box.style.MozTransform = transformstr;
}

socket.on('connect', function () {
 
  //logger.style.color = '#22d332';
  jQuery('#status').css({'color':'#22d332'});
  jQuery('#status').html('Connected');
 //logger.innerText.HTML = 'connected';
 
  socket.on('movesquare', function(data) {
    //socket.emit('devicemove',data);
    moveBox(data);
  });
  socket.on('disconnect',function() {
    // visually disconnect
    // logger.style.color = '#d31713';
    // logger.innerText = 'disconnected';
     jQuery('#status').css({'color':'#d31713'});
  jQuery('#status').html('Not Connected, Please Refresh');
  });
});

//var is_client = document.getElementById('is_client');

function handleOrientationEvent(z,x,o) {
  var data = {
    z: (Math.round(z))*3,
    x: (Math.round(x))*3,
    o: (Math.round(o))*3,
    
  };
  //alert(data.z);
    socket.emit('devicemove', data);
    moveBox(data);
 
}


jQuery(document).ready(function(){
    alert(navigator.userAgent);
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
$('#onDesk').hide();
$('#upload').hide();
var htm="<b>Great ! you are on a mobile device, use this to manipulate the image</b>";
htm+="<br/>";
$('#checkSize').html('');

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
$('#checkSize').html('<b>Use a mobile device with accelerometer to manipulate this image</b><br/> or use <b><a href="http://goo.gl/kHTpeI">http://goo.gl/kHTpeI</a></b>');
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