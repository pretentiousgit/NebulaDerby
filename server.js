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
    position: 60,
    final: 4
  },
  {
    name: "cyber",
    position: 60,
    final: 4
  },
  {
    name: "love",
    position: 60,
    final: 4
  },
  {
    name: "predator",
    position: 60,
    final: 4
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
    ...initialState,
    whales: [
      {
        name: "imperial",
        position: 60,
        final: 4
      },
      {
        name: "cyber",
        position: 60,
        final: 4
      },
      {
        name: "love",
        position: 60,
        final: 4
      },
      {
        name: "predator",
        position: 60,
        final: 4
      }
    ]
  };
  console.log('new heat', state);
  io.emit('whaleState', state);
  io.emit('newHeat', state);
}

function handleAdminEvent(event) {
  console.log(event, state);
  if (!state[event]) {
    io.emit('adminEvent', event);
    state = {
      ...state, [event]: true
    };
  } else {
    console.log('event', event, ' already fired');
  }
}

function checkIfRunning(f) {
  if (state.running === true) {
    console.log('Heat already running');
  } else {
    f();
  }
}

function calculateMix(final) {

  /* 
    todo: on client boot, pass through the amount of space for a whale to race
    Use that here
  */

  /* TODO:
  Whale Race Math Notes
  max distance a whale can go: 1490
  to find possible interval distances, divide 1490 by race time
  ex: 10000 / 100 = 100 intervals
  ex: 10000 / 120 = ~81 intervals?
  ex: 10000 / 240 = ~41 intervals
  divide 1490 by number of intervals:
  1490/81 = 18.39 
  1490/41 = 36.34

  TODO: MAKE GAPS BIGGER BETWEEN WHAAAALES

  */

  const fieldWidth = ((state.fieldSize || 1490) * 2);
  const numberOfIntervals = initialState.raceTimer / state.interval;
  const whaleDistanceMax = (fieldWidth / numberOfIntervals);
  const quarter = whaleDistanceMax / 4;

  const minMovement = () => {
    switch (final) {
      case 1:
        return quarter * 3;
      case 2:
        return quarter * 2;
      case 3:
        return quarter;
      default:
        return 1;
    }
  };

  function randomizer(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  function randn_bm() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1] to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  const rando = randomizer(minMovement(), whaleDistanceMax);
  const rando2 = randn_bm();

  return rando;
};

function checkWinner(whale, i) {
  const update = {
    ...whale,
    position: whale.position += calculateMix(whale.final)
  };

  if (update.position >= state.fieldSize) {
    console.log('A whale has won!');
    clearInterval(i);
  }

  return update;
}

function runRace(info) {
  console.log('startRace event', info);
  io.emit('startRace', state.raceTimer);

  state = {
    ...state,
    running: true,
    fakeHeat: info.fakeHeat,
    whales: [
      {
        name: "imperial",
        position: 60,
        final: 4
      },
      {
        name: "cyber",
        position: 60,
        final: 4
      },
      {
        name: "love",
        position: 60,
        final: 4
      },
      {
        name: "predator",
        position: 60,
        final: 4
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
        default:
          return { ...whale };
      }
    });
  }

  const race = setInterval(() => {
    // check if there's a winner yet
    // if not, continue
    // if so, set the winner and let the timer run down
    state = {
      ...state,
      raceTimer: state.raceTimer -= state.interval,
      whales: state.whales.map(whale => (checkWinner(whale, race)))
    };

    io.emit('whaleState', state);
  }, state.interval);

  setTimeout(() => {
    stopRace();
    clearInterval(race);
  }, state.raceTimer);

  io.emit('whaleState', state);
}

/*
-- if it is a fake heat, the whale order should be taken into account
--otherwise, just run the numbers
-- add a STOP RACE
-- Make sure whales stop when they hit the "finish line"
-- Add a "finish line"
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

  socket.on("fieldSize", (data) => {
    console.log('Fieldsize data', data);
    state.fieldSize = (data.bolt.left + (data.bolt.width / 2)) - data.whales[0].right;
    console.log("fieldSize", state.fieldSize);
    // map whales against starting position in game, add those to global state
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
      default:
        handleAdminEvent(data.event);
        break;
    }
  });
});
