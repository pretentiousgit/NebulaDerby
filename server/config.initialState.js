
const initialState = {
  raceTimer: 10000,
  interval: 120,
  running: false,
  race: '',
  fakeHeat: false
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