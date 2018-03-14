const gauss = require('gaussian');
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

        // ORDER OF WIN
        // Whales move according to a normalized distro around likelihood of winning
        // whales start out equal strength for first ~15-30 seconds
        // After 30 seconds, whales get power boosts from beacon, love state
        // winning the beacon gives an 80% chance of winning

        // The fastest whale is x between 1:59 & 2:02, with each whale after coming in between 1-2 sec more each.
        // Base speed for each whale is 1025 movements across the screen width 
        // 1600	900	HD+ => 1.56px per movement for smooth @ 120ms pulse
        // 1920	1080	Full HD => 1.87px per move for smooth @ 120ms pulse

        /*
          A perfect normal distribution will be 4 whales arriving at 2min
          If there's a beacon, that whale gets a 5% speed increase - what is speed? Velocity is distance over time
          var distribution = gaussian(mean, variance);
        */


        // if( data.adminEvent.whaleOrder ) {
        //   update the order of whales on the back end
        //   sets final winning arrangement
        // }

        // if(predator event)
        //  update the event to run the predator animation according to notes
        //  - predator whale can eat a given other whale
        //  - in first 10 seconds kills 4th whale, who is removed from game entirely

        // if Game RESET:
        // Restore initial state and send to admin interface

        // if( beacon)
        //  update whale powers according to beacon value
        //  Add beacon to main screen by changing "glow" of finish line
        // BLUE: IMPERIAL
        // GREEN: CYBER
        // RED: SAVAGE/PREDATOR
        // Beacon gives an 80% win ratio

        // Add Love Whale states, 1, 2, 3 for slow, med, fast powers
        // Add love whale colours - pink, pinker, pinkest

        // if( data.adminEvent.whale.predator) {
        //   // set up the predator attack animation/consequences
        // };


const range = (n) => {
  const r = [];
  for (let i = 0; i < n; i += 1) {
    r.push(i);
  }
  return r;
};

function randn_bm() { // random box-mueller number around 0,1 - this is a good multiplier for another number
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1] to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function generateFairMovementArray (fast = 90000, slow = 120000, interval = 240, distance = 1600) {
  const slots = (int) => int / interval;
  const speed = (arrayPlaces) =>  Number((distance / arrayPlaces).toFixed(2)); // min of pixels we have to hit

  const pace = {
    slow: speed(slots(slow)),
    fast: speed(slots(fast))
  };

  console.log('fastSpeedInPix, slowSpeedInPix', pace.slow, pace.fast);

  const iterator = () => Number(getRandomArbitrary(pace.slow, pace.fast).toFixed(2));

  const whaleArray = [];
  let accumulator = 0;

  while (accumulator < distance) {
    const step = iterator();
    whaleArray.push(step);
    accumulator += step;
  }

  console.log(whaleArray.length);

  console.log('biggest step', Math.max(...whaleArray));
  console.log('smallet step', Math.min(...whaleArray));

  return whaleArray;
};

// fair movement will generate a pretty even back and forth


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
  clientScreenSize,
  generateFairMovementArray
  // fakeHeatWhaleOrder,
};