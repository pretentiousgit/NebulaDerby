module.exports = function Race() {
  const store = require('../redux/store');
  const actions = require('../redux/boundActions');
  const state1 = store.getState();

  function endRace(message, race) {
    store.dispatch(actions.stopRace(message));
    clearInterval(race);
    return;
  }

  // turn on race state
  if(state1.running === false) {
    store.dispatch(actions.startRace());
  }

  const race = setInterval(() => {
    const state = store.getState();
    const newRaceTime = state.raceTimeRemaining -= state.interval;

    // an event killed the race
    if( state.running === false) {
      endRace('an action ended the race', race);
    }

    // did we run out of time? Stop the race.
    if( newRaceTime <= 0) {
      endRace('new race time is less than zero', race);
    }

    // run the race normally
    store.dispatch(actions.updateRacePositions(newRaceTime));

    // todo: update each whale with their new position
    // set the whale's position using a normal distribution from x
    // if we have a predator whale, set that to true, and have the predator whale attack
    // if we have a beacon set, add 5% to appropriate whale


  }, state1.interval);
  return race;
};

// function runRace(info, state) {
//   console.log('startRaceEvent', info, state.fieldSize);

//   // move this to an earlier piece of work when we receive a command to start the race
//   if (info.fakeHeat) {
//     actions.reorderWhales();
//     newState.whales = fakeHeatWhaleOrder(state.whales);
//   }
// }