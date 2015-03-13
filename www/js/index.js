var interval = null;
var currentCount = 0;

$(document).ready(function(){
  document.addEventListener('deviceready', onDeviceReady, false);
  document.addEventListener('pause', onPause, false);
  document.addEventListener('resume', onResume, false);
    $("#btnTakePicture").click(btnTakePictureClicked);
    $("#btnOpenPicture").click(btnOpenPictureClicked);

    $('#btnGetGeolocation').click(btnGetGeolocationClicked);
    $('#btnStartTeller').click(btnStartTellerClicked);
});

function onPause(){
  if(interval){
    clearInterval(interval);
    interval = null;
  }
}

function onResume(){
  if(!interval){
    interval = setInterval(updateTellerUi, 1000);
  }
}

function onDeviceReady(){
    $("#btnTakePicture").prop("disabled", false);
    $("#btnOpenPicture").prop("disabled", false);
    $("#btnGetGeolocation").prop("disabled", false);
    $("#btnStartTeller").prop("disabled", false);
}

function btnStartTellerClicked(){
   interval = setInterval(updateTellerUi, 1000);
}

function updateTellerUi(){ 
  $('#teller').text(++currentCount); 
}

function btnTakePictureClicked(){
    getPicture();
}

function btnOpenPictureClicked(){
    getPicture(Camera.PictureSourceType.PHOTOLIBRARY);
}

function getPicture(source){
    var cameraOptions = { 
        destinationType : Camera.DestinationType.DATA_URL,
        EncodingType : Camera.EncodingType.JPEG,
        correctOrientation : true
    };

    if(source !== undefined){
        cameraOptions.sourceType = source;
    }

    navigator.camera.getPicture(function(imageData){
        $("#photoContainer").html("<img src='data:image/jpeg;base64," + imageData + "' />");
    }, function(err){
        alert(err);
    }, cameraOptions);
}

function btnGetGeolocationClicked(){
    var geolocationOptions = {
        maximumAge : 10000,
        timeout: 2500,
        enableHighAccuracy: true
    };

    navigator.geolocation.getCurrentPosition(function(position){
        currentLocation = position;
        $("#geolocationContainer").html(
          'Latitude: '          + position.coords.latitude          + '<br />' +
          'Longitude: '         + position.coords.longitude         + '<br />' +
          'Altitude: '          + position.coords.altitude          + '<br />' +
          'Accuracy: '          + position.coords.accuracy          + '<br />' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br />' +
          'Heading: '           + position.coords.heading           + '<br />' +
          'Speed: '             + position.coords.speed             + '<br />' +
          'Timestamp: '         + position.timestamp
        );
    }, function(err){
      alert(err.message);
    }, geolocationOptions);
}