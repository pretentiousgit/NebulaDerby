
const initialState = {
  raceTimeTotal: 4000,
  raceTimeRemaining: 4000,
  finishLine: 900,
  interval: 120,
  running: false,
  fakeHeat: false,
  winner: []
};

const initialWhales = [
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
];

module.exports = Object.freeze({
  ...initialState,
  whales: initialWhales,
  pilots: require('./config.pilotsList')
});