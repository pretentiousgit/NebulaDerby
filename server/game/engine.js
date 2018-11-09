module.exports = function Race() {
  const store = require('../redux/store');
  const actions = require('../redux/boundActions');
  const state1 = store.getState();

  function endRace(message, race) {
    clearInterval(race);
    console.log('Received EndRace Request');
    store.dispatch(actions.stopRace(message));
    return;
  }

  // turn on race state
  if (state1.running === false) {
    //Set "running" to true this is a weird not-useful thing?
    store.dispatch(actions.startRace());
  }

  const race = setInterval(() => {
    const state = store.getState();

    const { whales, finishLine } = state;

    const winner = whales.filter((f) => {
      return f.position > finishLine;
    });

    // A whale won
    if (state.running === false || winner.length > 0) {
      console.log('Winner', winner);
      endRace('an action ended the race', race);
      store.dispatch(actions.setWinner(winner[0]));
    }

    const newRaceTime = state.raceTimeRemaining -= state.interval;

    // run the race normally
    store.dispatch(actions.updateRacePositions(newRaceTime));

    // todo: update each whale with their new position
    // set the whale's position using a normal distribution from x
    // if we have a predator whale, set that to true, and have the predator whale attack
    // if we have a beacon set, add 5% to appropriate whale
  }, state1.interval);

  return race;
};
