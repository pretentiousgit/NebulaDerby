console.log('initSocket loaded');


// Primus connection options
const options = {
  pingTimeout: 10000,
  timeout: 10000,
  reconnect: {
    max: Infinity, // Number: The max delay before we try to reconnect.
    min: 500, // Number: The minimum delay before we try reconnect.
    retries: 10 // Number: How many times we should try to reconnect.
  },
  strategy: 'online, timeout, disconnect'
};

//const socket = Primus.connect('http://localhost:3001/game/', { options });
const socket = io('http://localhost:3001/game/');

function reset() {
  console.log('play reset');
  clearVictoryMessage();
  clearEvents();
  var arr = {
    whales: [
      {
        name: 'loveWhale',
        left: 60,
        top: 808,
        element: document.getElementById('loveWhale')
      },
      {
        name: 'cyberWhale',
        left: 60,
        top: 629,
        element: document.getElementById('cyberWhale')
      },
      {
        name: 'imperialWhale',
        left: 60,
        top: 257,
        element: document.getElementById('imperialWhale')
      },
      {
        name: 'predatorWhale',
        left: 60,
        top: 398,
        element: document.getElementById('predatorWhale')
      }
    ]
  };
  setWhalePositions(arr);

};

function playWiper() {
  console.log('Playing wiper');
  hypeDocument.startTimelineNamed('wiper', hypeDocument.kDirectionForward);
}

function pred_imperial() {
  console.log('Playing pred_imperial');
  hypeDocument.startTimelineNamed('predator_imperial', hypeDocument.kDirectionForward);
}

function pred_cyber() {
  console.log('Playing pred_cyber');
  hypeDocument.startTimelineNamed('predator_cyber', hypeDocument.kDirectionForward);
}

function pred_love() {
  console.log('Playing pred_love');
  hypeDocument.startTimelineNamed('predator_love', hypeDocument.kDirectionForward);
}

function setWhalePositions(array) {
  console.log('check array', array);
  array.whales.map((whale) => {
    const el = whale.element || whales.find((obj) => obj.name === whale.name).element;
    hypeDocument.setElementProperty(el, 'left', whale.left, 0.24, 'easeout');
    hypeDocument.setElementProperty(el, 'top', whale.top, 0.24, 'easeout');
    hypeDocument.setElementProperty(el, 'opacity', 1, 0.24, 'easeout');
    hypeDocument.setElementProperty(el, 'rotateZ', 0, 0.24, 'easeout');
    hypeDocument.setElementProperty(el, 'rotateY', 0, 0.24, 'easeout');
    hypeDocument.setElementProperty(el, 'rotateX', 0, 0.24, 'easeout');
  });
}

function getWhalePositions() {
  document.getElementById('');
}

function clearVictoryMessage() {
  hypeDocument.setElementProperty(hypeDocument.getElementById('victory'), 'opacity', 0);
  hypeDocument.setElementProperty(hypeDocument.getElementById('victoryWhale'), 'opacity', 0);
  hypeDocument.getElementById('victoryWhale').innerHTML = '';
}

function clearEvents() {
  hypeDocument.pauseTimelineNamed('fleetLoop');
  hypeDocument.pauseTimelineNamed('galactagasm');
  hypeDocument.pauseTimelineNamed('tranzonic');

  hypeDocument.setElementProperty(hypeDocument.getElementById('rectangle'), 'opacity', 0);

  hypeDocument.setElementProperty(hypeDocument.getElementById('tranz1'), 'opacity', 0);
  hypeDocument.setElementProperty(hypeDocument.getElementById('tranz2'), 'opacity', 0);
  hypeDocument.setElementProperty(hypeDocument.getElementById('tranzBG'), 'opacity', 0);
  hypeDocument.setElementProperty(hypeDocument.getElementById('tranzText'), 'opacity', 0);

  hypeDocument.setElementProperty(hypeDocument.getElementById('gasm'), 'opacity', 0);

  hypeDocument.setElementProperty(hypeDocument.getElementById('fleetAttackText'), 'opacity', 0);
  hypeDocument.setElementProperty(hypeDocument.getElementById('fleetAttackBG'), 'opacity', 0);
}

const whales = [{
  name: "imperial",
  element: hypeDocument.getElementById('imperialWhale')
},
{
  name: "cyber",
  element: hypeDocument.getElementById('cyberWhale')
},
{
  name: "predator",
  element: hypeDocument.getElementById('predatorWhale')
},
{
  name: "love",
  element: hypeDocument.getElementById('loveWhale')
}];

document.addEventListener("keydown", function (e) {
  console.log('event', e, e.which);

  if (e.which === 32) {
    pred_imperial();
  }
  if (e.which === 65) {
    pred_cyber();
  }
  if (e.which === 83) {
    pred_love();
  }

  if (e.which === 82) {
    reset();
  }
});

socket.on('startRace', function (msg) {
  clearVictoryMessage();
  clearEvents();
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
  }

  const timer = hypeDocument.getElementById('gameTimer');
  console.log('timer', timer, msg);

  var timerValue = msg;

  const intervalId = setInterval(() => {
    timer.innerHTML = millisToMinutesAndSeconds(timerValue);
    timerValue -= 20;
  }, 20);

  setTimeout(() => {
    clearInterval(intervalId);
  }, msg);
});

socket.on('whaleState', (msg) => {
  setWhalePositions(msg);
});

socket.on('newHeat', (msg) => {
  setWhalePositions(msg);
  clearVictoryMessage();
  clearEvents();
});

socket.on('predator', (msg) => {
  // set predator whale's target
  // do a bunch of blood splashes
  // have target whale turn belly-up and fall offscreen
  setWhalePositions(msg);
  clearVictoryMessage();
  clearEvents();
});

socket.on('winner', (msg) => {
  hypeDocument.getElementById('victoryWhale').innerHTML = msg.faction;
  hypeDocument.startTimelineNamed('victory', hypeDocument.kDirectionForward);
});

socket.on('adminEvent', (event) => {
  console.log('Event', event);
  if (event === 'FleetAttack') {
    hypeDocument.startTimelineNamed('fleetAttack', hypeDocument.kDirectionForward);
    hypeDocument.startTimelineNamed('fleetLoop', hypeDocument.kDirectionForward);
  }
  if (event === 'Galactagasm') {
    hypeDocument.startTimelineNamed('galactagasm', hypeDocument.kDirectionForward);
    setTimeout(() => {
      hypeDocument.pauseTimelineNamed('galactagasm');
      clearEvents();
    }, 15000);
  }
  if (event === 'TranzonicInterference') {
    hypeDocument.startTimelineNamed('tranzonic', hypeDocument.kDirectionForward);
    setTimeout(() => {
      hypeDocument.pauseTimelineNamed('tranzonic');
      clearEvents();
    }, 15000);
  }
});
