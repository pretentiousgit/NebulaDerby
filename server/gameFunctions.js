const { reverse, sortBy } = require('lodash');

function finalLoadSize(data, state) {
  console.log('finalLoadSize', state);
  return {
    ...state,
    fieldSize: data.finishLine - data.whales[0].scaleSize
  };
}

function enterRoom(data, socket, io, clientList) {
  console.log("A user joined", data.user);
  clientList.concat({ name: data.user, id: socket.id });
  socket.join("whaleSpace");
  io.emit("currentUserList", clientList);
}

function adminEvent(data) {
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
}

// TODO: wrap Boot and install Electron to serve the whales screen
function stopRace(race, state) {
  const r = race || state.race;
  clearInterval(r);

  return {
    ...state,
    running: false,
    race: null
  };
}

function getWinner(race, state) {
  stopRace(race);

  const victory = state.whales.reduce((prev, current) => (prev.position > current.position) ? prev : current);
  const standings = reverse(sortBy(state.whales, 'position')).map((whale) => {
    return whale.name;
  });

  console.log('race complete!', victory, standings);
  return {standings, victory};
}

function newHeat(state) {
  return {
    ...state,
    raceTimer: 10000,
    interval: 120,
    running: false,
    race: null,
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
}

function handleAdminEvent(event) {
  console.log(event, state);
  if(event === 'FleetAttack'){
    io.emit('adminEvent', event);
    stopRace();
  } else {
    io.emit('adminEvent', event);
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
    getWinner(i);
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
        race: race,
        raceTimer: state.raceTimer -= state.interval,
        whales: state.whales.map(whale => (checkWinner(whale, race)))
      };

      io.emit('whaleState', state);
    } else {
      getWinner(race);
    }
  }, state.interval);

  setTimeout(() => {
    if(state.running === true){
      console.log('state in timeout', );
      getWinner(race);
    }
  }, state.raceTimer);

  io.emit('whaleState', state);
}

module.exports = {
  enterRoom,
  adminEvent,
  finalLoadSize
};