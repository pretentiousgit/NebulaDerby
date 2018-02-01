const { reverse, sortBy } = require('lodash');

const store = require('../redux/store');
const actions = require('../redux/boundActions');

function clientScreenSize(data, state) {
  console.log('clientScreenSize', state);
  return {
    ...state,
    fieldSize: data.finishLine - data.whales[0].scaleSize
  };
}

function getWinner(race, whaleList) {
  const victory = whaleList.reduce((prev, current) => (prev.position > current.position) ? prev : current);
  const standings = reverse(sortBy(whaleList, 'position')).map((whale) => whale.name );

  console.log('race complete!', victory, standings);
  return {standings, victory};
}

function calculateMix(final) {
  const fieldWidth = ((state.fieldSize) * 2);
  const numberOfIntervals = initialState.raceTimeRemaining / state.interval;
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

// function checkWinner(whale, i) {
//   const update = {
//     ...whale,
//     position: whale.position += calculateMix(whale.final)
//   };

//   if (update.position >= state.fieldSize) {
//     console.log('A whale has won!', update.position, state.fieldSize);
//     getWinner(i);
//     console.log('after StopRace', );
//   }

//   return update;
// }


// function fakeHeatWhaleOrder(array) {
//   return array.map((whale) => {
//     switch (info.whaleOrder.indexOf(whale.name)) {
//       case 0:
//         return { ...whale, final: 1 };
//       case 1:
//         return { ...whale, final: 2 };
//       case 2:
//         return { ...whale, final: 3 };
//       case 3:
//         return { ...whale, final: 4 };
//       default:
//         return { ...whale };
//     }
//   });
// }

module.exports = {
  bindAction,
  // fakeHeatWhaleOrder,
  clientScreenSize
};