const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const osc = require("osc-js");
const path = require('path');

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
  running: false
}

const initialWhales = [
  {
    name: "imperial",
    position: 60
  },
  {
    name: "cyber",
    position: 60
  },
  {
    name: "love",
    position: 60
  },
  {
    name: "predator",
    position: 60
  }
]

let state = {
  ...initialState,
  whales: [...initialWhales]
};

/* 
  To Do:
    - on race launch, set timer for 2 min
    -- On CLIENT, set WHALE POSITION
    -- on CLIENT, set END POSITION
    - Every 500ms, check value from RNG, set position to position + RNG (multiple?)
    - if position > END POSITION, end heat, send "END HEAT" message and winning whale
    - 

*/

function moveForward(position) {
  const mix = Math.floor((Math.random() * 6) + 1);
  // 1490px total screen space
  // start and end 5% from edge of screen
  // 6 px per second
  return position += mix;
}

function stopRace(race) {
  clearInterval(race);
  state.running = false;
  const victory = state.whales.reduce((prev, current) => (prev.position > current.position) ? prev : current);
  console.log('race complete!', victory);
  io.emit('winner', victory);
}

function newHeat() {
  state = {
    ...initialState,
    whales: [
      {
        name: "imperial",
        position: 60
      },
      {
        name: "cyber",
        position: 60
      },
      {
        name: "love",
        position: 60
      },
      {
        name: "predator",
        position: 60
      }
    ]
  };
  console.log('new heat', state);
  io.emit('whaleState', state);
}

function handleAdminEvent(event) {
  console.log(event, state);
  if (!state[event]) {
    io.emit('adminEvent', event);
    state = {
      ...state, [event]: true
    }
  } else {
    console.log('event', event, ' already fired');
  }
}


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
*/

function calculateMix(whale) {
  /* 
    todo: on client boot, pass through the amount of space for a whale to race
    Use that here
  */
  const screenWidth = ((state.fieldSize || 1490) * 2);

  const numberOfIntervals = initialState.raceTimer / state.interval;
  const whaleDistanceMax = screenWidth / numberOfIntervals;

  return Math.floor((Math.random() * whaleDistanceMax) + 1);
};

function checkIfRunning(f) {
  if (state.running === true) {
    console.log('Heat already running');
  } else {
    f();
  }
}

function runRace() {
  console.log('startRace event');
  io.emit('startRace', state.raceTimer);
  state = { ...state, running: true };

  const race = setInterval(() => {
    state = { ...state, raceTimer: state.raceTimer -= state.interval };

    state.whales.map((whale) => {
      const mix = calculateMix(whale.name)
      whale.position += mix;
    })

    io.emit('whaleState', state);
  }, state.interval);

  setTimeout(() => {
    stopRace(race)
  }, state.raceTimer);

  /*
  -- if it is a fake heat, the whale order should be taken into account
  --otherwise, just run the numbers
  --add a state for WHALE WINS -- ANIMATE
  -- Add a TRANZONIC INTERFERENCE -- ANIMATE
  --Add a GALACTAGASM -- ANIMATE
  --Add an IMPERIAL FLEET -- ANIMATE
  --Add a PREDATOR WHALE EVENT
  */
}

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("fieldSize", (data) => {
    console.log("fieldSize", data);
    state.fieldSize = data.message;
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
        checkIfRunning(runRace);
        break;
      default:
        handleAdminEvent(data.event);
        break;
    }
  });
});
