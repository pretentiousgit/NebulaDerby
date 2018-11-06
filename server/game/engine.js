module.exports = function Race() {
  const store = require('../redux/store');
  const actions = require('../redux/boundActions');
  const state1 = store.getState();

  console.log('check our state', state1);

  function endRace(message, race) {
    clearInterval(race);
    console.log('Received EndRace Request');
    store.dispatch(actions.stopRace(message));
    return;
  }

  // turn on race state
  if (state1.running === false) {
    store.dispatch(actions.startRace());
  }

  const race = setInterval(() => {
    const state = store.getState();
    const newRaceTime = state.raceTimeRemaining -= state.interval;

    // an event killed the race
    if (state.running === false || newRaceTime <= 0) {
      endRace('an action ended the race', race);
    }

    // run the race normally
    console.log('dispatch');
    store.dispatch(actions.updateRacePositions(newRaceTime));

    // todo: update each whale with their new position
    // set the whale's position using a normal distribution from x
    // if we have a predator whale, set that to true, and have the predator whale attack
    // if we have a beacon set, add 5% to appropriate whale
  }, state1.interval);
  return race;
};
