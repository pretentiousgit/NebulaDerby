module.exports = function Race() {
  const store = require('../redux/store');
  const actions = require('../redux/boundActions');
  const state1 = store.getState();

  function endRace(message, race) {
    store.dispatch(actions.stopRace(message));
    clearInterval(race);
    return;
  }

  console.log('is race running?', state1.running);

  // turn on race state
  if(state1.running === false) {
    store.dispatch(actions.startRace());
  }

  const race = setInterval(() => {
    const state = store.getState();
    const newRaceTime = state.raceTimeRemaining -= state.interval;
    // did we run out of time? Stop the race.
    if( state.running === false) {
      endRace('an action ended the race', race);
    }

    // did we run out of time? Stop the race.
    if( newRaceTime <= 0) {
      endRace('new race time is less than zero', race);
    }

    // run the race normally
    store.dispatch(actions.updateRacePositions(newRaceTime));
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

//   const race = setInterval(() => {
//     // check if there's a winner yet
//     // if not, continue
//     // if so, set the winner and let the timer run down

//     // this state is overwriting the state written by checkWinner - checkWinner needs to be prioritized
//   //   if(state.running === true){
//   //     state = 

//   //     io.emit('whaleState', state);
//   //   } else {
//   //     getWinner(race);
//   //   }
//   // }, state.interval);

//   setTimeout(() => {
//     if(state.running === true){
//       console.log('state in timeout', );
//       getWinner(race);
//     }
//   }, state.raceTimeRemaining);
// }