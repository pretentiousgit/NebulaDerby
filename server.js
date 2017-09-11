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
  interval: 240,
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

function runRace() {
  // 90000
  console.log('startRace');
  if (state.running) {
    console.log('Race in progress!');
    return;
  }
  else {
    state.running = true;

    const interval = state.interval;
    let count = 0;

    const race = setInterval(() => {
      state.raceTimer += interval;
      count += 1;
      state.whales.map((whale) => {
        const mix = Math.floor((Math.random() * 75) + 1);
        whale.position += mix;
      })
      io.emit('messageToClient', state);
      console.log('count', count, state.whales[0].position);
    }, interval);

    setTimeout(stopRace, state.raceTimer);

    /* TODO:
      -- Add font with race timer to front
      --  race should count down
      -- whales should race across big screen in about 2 minutes but 2 minutes is A LONG TIME
      -- add a state for WHALE WINS
      -- Add a TRANZONIC INTERFERENCE
      -- Add a GALACTAGASM
      -- Add an IMPERIAL FLEET
      -- Add a PREDATOR WHALE EVENT
     */

    function stopRace() {
      clearInterval(race);
      console.log('initial states', initialState, initialWhales);
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
      io.emit('messageToClient', state);
      console.log('race complete!', state);
    }
  }
}

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("message!", msg);
    io.emit('messageToClient', 'hello world!');
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

  socket.on("adminEvent", function (data) {
    if (data.event === 'startRace') {
      runRace();
    } else {
      console.log("An Event!", data.event);
      io.emit(data.event);
    }
    /* Possible Events List
     * Galactagasm
     * TranzonicInterference
     * FleetAttack
     * startRace
    */
  });
});
