const {
  resetRace,
  startRace,
  stopRace,
  updateRacePositions,
  reorderRacePositions,
  tranzonic,
  fleetAttack,
  galactagasm
} = require('./actions');

function bindAction(bound, args) {
  const store = require('./store');
  return store.dispatch(bound(args));
};

module.exports = {
  resetRace: () => bindAction(resetRace),
  startRace: () => bindAction(startRace),
  stopRace: () => bindAction(stopRace),
  updateRacePositions: (args) => bindAction(updateRacePositions, args),
  reorderRacePositions: (args) => bindAction(reorderRacePositions, args),
  tranzonic: () => bindAction(tranzonic),
  fleetAttack: () => bindAction(fleetAttack),
  galactagasm: () => bindAction(galactagasm)
};