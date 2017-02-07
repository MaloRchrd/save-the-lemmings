


var ColisionSound = function(sound) {
  var win = new Audio('sound/YIPPEE.WAV');
  var fail = new Audio('sound/GLUG.WAV');
  var soundStart= new Audio('sound/LETSGO.WAV');

  if (sound == 'soundStart') {
    soundStart.play();}

    if (sound == 'win') {
      win.play();
    }else {
      if (sound == 'fail') {
        fail.play();
      }
    }

  };
