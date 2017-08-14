var videod;
var lastNote;
var noteIn;
var midiNoteInfo;
var message;
var lastNoteState;
var lastNoteIn;

function setup(){

noCanvas();
// var canvas = createCanvas(windowWidth, windowHeight);
var body = $('body');
// body.append(canvas);

// pageBody.appendTo(canvas);
//
// var videoSrc = albums[1][1];
// var video = createVideo([videoSrc])
//
// video.loop();
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
          .then(success, failure);

        console.log("success");
  }

  function success (midi) {
     var inputs = midi.inputs.values();
      // inputs is an Iterator

      for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          // each time there is a midi message call the onMIDIMessage function
          input.value.onmidimessage = onMIDIMessage;
          console.log(input.value);
          //$("#song-title").text("You are connected. Press any square to start video channel. Channell will restart when alloted data rations are met. Enjoy.")
      }

  }


  function failure () {
      console.error('No access to your midi devices.')
  }

  var totalSlides = 0;
var midiHue, midiInvert, midiSat,
satString, hueString, invertString,
midiBlur, blurString, midiContrast,
contrastString, midiAlpha, alphaString,
midiBrightness, brightnessString;
var count = 0;
  function onMIDIMessage (message) {

      // console.log(message.data);

      if(message.data[0] === 144){
        noteIn = true;
        if(noteIn === lastNoteIn){
          console.log(noteIn);
        }
        lastNoteIn = noteIn;

        var randomClip = function(){
            var clipSrc = [];
            clipSrc = [Math.floor( Math.random() * albums.length )];

            return clipSrc;

        }

        count++;
        if(count === 1){
          $("#intro").css("display","none");
          $("#instructions").css("display","block");
        }

        var thisClip = randomClip();
        var finalClip = thisClip[0];
        $("#song-title").text(albums[finalClip][0]);

        // console.log(finalClip);

	if(count === 2) {
		$("#instructions").css("display","none");	
	}

        $(".slide").removeClass('active');
        var slide = document.createElement('div');
        slide.className = "slide active";
        slide.id = "slide-"+totalSlides;
        var video = document.createElement('video');
        video.className = "videos";
        video.id = "video-"+totalSlides;
        video.src = albums[finalClip][1];



        $('#slide-container').append(slide);
        slide.appendChild(video);


        totalSlides++;


        $('.videos').each(function() {
            // $(this)[0].pause();
            var allTotal = document.getElementsByClassName('slide');
            if(allTotal.length > 4){
              location.reload();
            }
        });
        $('.active video')[0].play();
        // $('.active video')[0].volume = 1.0;



      }

      if(message.data[0] === 224){
        location.reload();
      }


      if(message.data[0] === 176){

        if(message.data[1] === 1){
              midiBlur = int(map(message.data[2], 0, 127, 0, 50));
              blurString = "blur("+midiBlur+"px)";
              $(".active video").css("-webkit-filter", blurString);
              // console.log(midiBlur);
            }

            if(message.data[1] === 2){
              midiContrast = map(message.data[2], 0, 127, 0, 100);
              contrastString = "contrast("+midiContrast+"%)";
              $(".active video").css("-webkit-filter", contrastString);
              // console.log(midiContrast);
            }

            if(message.data[1] === 3){
              midiBrightness = int(map(message.data[2], 0, 127, 0, 100));
              brightnessString = "brightness("+midiBrightness+"%)";
              $(".active video").css("-webkit-filter", brightnessString);
              // console.log(midiBrightness);
            }

            // clear everything
            if(message.data[1] === 4){
              midiAlpha = map(message.data[2], 0, 127, 0, 100);
              alphaString = "opacity("+midiAlpha+"%)";
              $(".active video").css("-webkit-filter", alphaString);
              // console.log(midiAlpha);
            }


            if(message.data[1] === 5){


              midiHue = int(map(message.data[2], 0, 127, 0, 360))
              hueString = "hue-rotate("+midiHue+"deg)";
              // $(".active video").css("-webkit-filter",hueString);
              $(".active video").css("-webkit-filter", hueString);
            }

            if(message.data[1] === 6){

              midiSat = int(map(message.data[2], 0, 127, 0, 10))
              satString = "saturate("+midiSat+")";
              $(".active video").css("-webkit-filter",midiSat);
            }

            if(message.data[1] === 7){

              midiInvert = int(map(message.data[2],0,127,0,100))
              invertString = "invert("+midiInvert+"%)";
                $(".active video").css("-webkit-filter",midiInvert);
            }

            if(message.data[1] === 8){
              var volLevel = map(message.data[2],0,127,0,1.0);
              $(".active video")[0].volume = volLevel;
            }

            // console.log(midiRed + ", " + midiGreen + ", " + midiBlue);
            var filters = hueString + " " + satString + " " + invertString + " "
            + brightnessString + " " + alphaString + " " + blurString + " " + contrastString;
            // console.log(filters);

            $(".active video").css("-webkit-filter", filters);

      }





  }




}

function draw(){


// background(255);
// var allPixels = video.loadPixels();
// console.log(allPixels);



}
