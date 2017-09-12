socket.on('startRace', function (msg) {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
  }

  const timer = hypeDocument.getElementById('gameTimer');
  console.log('timer', timer, msg);

  var timerValue = msg;

  setInterval(() => {
    timer.innerHTML = millisToMinutesAndSeconds(timerValue);
    timerValue -= 20;
  }, 20);
})