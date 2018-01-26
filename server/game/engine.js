module.exports = function Race() {
  const store = require('../redux/store');
  const actions = require('../redux/actions');
  const state1 = store.getState();

  return setInterval(() => {
    const state = store.getState();
    const newRaceTime = state.raceTimeRemaining -= state.interval;
    store.dispatch(actions.updateRacePositions(newRaceTime));
    console.log('running');
  }, state1.interval);
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