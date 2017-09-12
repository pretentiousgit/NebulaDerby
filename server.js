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
  const victory = state.whales.reduce((prev, current) => (prev.position > current.position) ? prev : current);
  console.log('race complete!', victory);
  io.emit('winner', victory);
}

function newHeat() {
  console.log('new heat', initialState, initialWhales);
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

function runRace() {
  console.log('startRace');
  if (state.running) {
    console.log('Race in progress!');
    return;
  }
  else {
    state.running = true;

    const numberOfIntervals = initialState.raceTimer / state.interval;
    const whaleDistanceMax = (1490 * 2) / numberOfIntervals;

    let count = 0;

    const race = setInterval(() => {
      state.raceTimer -= state.interval;
      count += 1;
      state.whales.map((whale) => {
        const mix = Math.floor((Math.random() * whaleDistanceMax) + 1);
        whale.position += mix;
      })
      io.emit('whaleState', state);
      console.log('count', count, state.whales[0].position);
    }, state.interval);

    setTimeout(() => {
      stopRace(race)
    }, state.raceTimer);


    /* TODO:
      
    max distance a whale can go: 1490
    to find possible interval distances, divide 1490 by race time
    ex: 10000 / 100 = 100 intervals
    ex: 10000 / 120 = ~81 intervals?
    ex: 10000 / 240 = ~41 intervals
    divide 1490 by number of intervals:
    1490/81 = 18.39 
    1490/41 = 36.34

      
      -- add a state for WHALE WINS
      -- Add a TRANZONIC INTERFERENCE
      -- Add a GALACTAGASM
      -- Add an IMPERIAL FLEET
      -- Add a PREDATOR WHALE EVENT
     */
  }
}

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("clientBoot", (msg) => {
    console.log("clientMessage!", msg);
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
        newHeat();
        break;
      case 'startRace':
        io.emit('startRace', state.raceTimer);
        runRace();
        break;
      default:
        handleAdminEvent(data.event);
        break;
    }
  });
});
