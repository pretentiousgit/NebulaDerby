const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const osc = require("osc-js");
const path = require('path');

const _ = require("lodash");
const sortBy = require('lodash/sortBy');
const reverse = require('lodash/reverse');

app.use(require("body-parser")());

// CONFIGURATION ====================================================
global.rootRequire = name => require(`${__dirname}/$
{name}`);

app.use('/game', express.static(__dirname + '/hypeAnimation'));

app.use('/', express.static(__dirname + '/build'));

// Turn on server
server.listen(3001, () => {
  console.log("Server listening on port 3001");
});

// Turn on socket.io rooms for message transport
const clientList = [];

const initialState = {
  raceTimer: 10000,
  interval: 120,
  running: false,
  race: '',
  fakeHeat: false
};

const initialWhales = [
  {
    name: "imperial",
    faction: "Gravisburg Imperium",
    position: 60,
    final: 1
  },
  {
    name: "cyber",
    faction: "Virtuous Sphere",
    position: 60,
    final: 1
  },
  {
    name: "love",
    faction: "Cult of the Pulsing Root",
    position: 60,
    final: 1
  },
  {
    name: "predator",
    faction: "Rikkenor",
    position: 60,
    final: 1
  }
];

let state = {
  ...initialState,
  whales: [...initialWhales]
};

function moveForward(position) {
  const mix = Math.floor((Math.random() * 6) + 1);
  // 1490px total screen space
  // start and end 5% from edge of screen
  // 6 px per second
  return position += mix;
}

function stopRace(race) {
  state.running = false;
  const victory = state.whales.reduce((prev, current) => (prev.position > current.position) ? prev : current);
  clearInterval(race);
  // for each object in the collection
  // if it is larger than the existing last object, push it into queue
  // if it is not, 

  const standings = reverse(sortBy(state.whales, 'position')).map((whale) => {
    return whale.name;
  });
  console.log('race complete!', victory, standings);
  io.emit('winner', victory);
  return standings;
}

function newHeat() {
  state = {
    ...state,
    raceTimer: 10000,
    interval: 120,
    running: false,
    race: '',
    whales: [
      {
        name: "imperial",
        faction: "Gravisburg Imperium",
        position: 60,
        final: 1
      },
      {
        name: "cyber",
        faction: "Virtuous Sphere",
        position: 60,
        final: 1
      },
      {
        name: "love",
        faction: "Cult of the Pulsing Root",
        position: 60,
        final: 1
      },
      {
        name: "predator",
        faction: "Rikkenor",
        position: 60,
        final: 1
      }
    ]
  };
  console.log('new heat', state);
  io.emit('whaleState', state);
  io.emit('newHeat', state);
}

function handleAdminEvent(event) {
  console.log(event, state);
  io.emit('adminEvent', event);
  if (!state[event]) {
    state = {
      ...state, [event]: true
    };
  } else {
    console.log('event', event, ' already fired');
  }
}

function checkIfRunning(f) {
  if (state.running === true) {
    console.log('Heat already running', state);
  } else {
    f();
  }
}

function calculateMix(final) {
  const fieldWidth = ((state.fieldSize) * 2);
  const numberOfIntervals = initialState.raceTimer / state.interval;
  const whaleDistanceMax = (fieldWidth / numberOfIntervals);
  const quarter = whaleDistanceMax / 4;

  const minMovement = () => {
    switch (final) {
      case 1:
        return whaleDistanceMax;
      case 2:
        return (whaleDistanceMax / 3) * 2;
      case 3:
        return whaleDistanceMax / 3;
      case 4:
        return quarter;
      default:
        return whaleDistanceMax;
    }
  };

  function randn_bm() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1] to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  const rando2 = Math.abs(randn_bm() * minMovement());

  return rando2;
};

function checkWinner(whale, i) {
  const update = {
    ...whale,
    position: whale.position += calculateMix(whale.final)
  };

  if (update.position >= state.fieldSize) {
    console.log('A whale has won!', update.position, state.fieldSize);
    stopRace(i);
    console.log('after StopRace', );
  }

  return update;
}

function runRace(info) {
  console.log('startRaceEvent', info, state.fieldSize);
  io.emit('startRace');

  state = {
    ...state,
    raceTimer: initialState.raceTimer,
    fakeHeat: info.fakeHeat,
    running: true,
    whales: [
      {
        name: "imperial",
        faction: "Gravisburg Imperium",
        position: 60,
        final: 1
      },
      {
        name: "cyber",
        faction: "Virtuous Sphere",
        position: 60,
        final: 1
      },
      {
        name: "love",
        faction: "Cult of the Pulsing Root",
        position: 60,
        final: 1
      },
      {
        name: "predator",
        faction: "Rikkenor",
        position: 60,
        final: 1
      }
    ]
  };

  if (info.fakeHeat) {
    state.whales = state.whales.map((whale) => {
      switch (info.whaleOrder.indexOf(whale.name)) {
        case 0:
          return { ...whale, final: 1 };
        case 1:
          return { ...whale, final: 2 };
        case 2:
          return { ...whale, final: 3 };
        case 3:
          return { ...whale, final: 4 };
        default:
          return { ...whale };
      }
    });
  }

  const race = setInterval(() => {
    // check if there's a winner yet
    // if not, continue
    // if so, set the winner and let the timer run down

    // this state is overwriting the state written by checkWinner - checkWinner needs to be prioritized
    if(state.running === true){
      state = {
        ...state,
        raceTimer: state.raceTimer -= state.interval,
        whales: state.whales.map(whale => (checkWinner(whale, race)))
      };

      io.emit('whaleState', state);
    } else {
      stopRace(race);
    }
  }, state.interval);

  setTimeout(() => {
    if(state.running === true){
      console.log('state in timeout', );
      stopRace(race);
    }
  }, state.raceTimer);

  io.emit('whaleState', state);
}

/*
--add a state for WHALE WINS -- ANIMATE
-- Add a TRANZONIC INTERFERENCE -- ANIMATE
--Add a GALACTAGASM -- ANIMATE
--Add an IMPERIAL FLEET -- ANIMATE
--Add a PREDATOR WHALE EVENT
*/


io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("finalLoadSize", (data) => {
    state = {
      ...state,
      fieldSize: data.finishLine - data.whales[0].scaleSize
    };
    console.log('finalLoadSize', state);
  });

  socket.on("enterRoom", (data) => {
    // This is where we hook the Muse headset into the server
    console.log("A user joined", data.user);
    clientList.concat({ name: data.user, id: socket.id });
    socket.join("whaleSpace");
    io.emit("currentUserList", clientList);
  });

  socket.on("adminEvent", (data) => {
    switch (data.event) {
      case 'newHeat':
        checkIfRunning(newHeat);
        break;
      case 'startRace':
        checkIfRunning(() => runRace(data.message));
        break;
      case 'stopRace':
        stopRace(state.race);
        break;
      default:
        handleAdminEvent(data.event);
        break;
    }
  });
});
