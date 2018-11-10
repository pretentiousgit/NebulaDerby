
const initialState = {
  raceTimeTotal: 110000,
  raceTimeRemaining: 110000,
  finishLine: 900,
  interval: 120,
  running: false,
  fakeHeat: false,
  loveWhaleBoost: 1,
  winner: [],
  beacon: {
    blue: false,
    green: false,
    red: false
  }
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