export function checkIfRunning(f, state) {
  if (state.running === true) {
    console.log('Heat already running');
  } else {
    f();
  }
}

export function calculateMix(bias, state) {
  const screenWidth = ((state.fieldSize || 1490) * 2);

  const numberOfIntervals = initialState.raceTimeRemaining / state.interval;
  const whaleDistanceMax = (screenWidth / numberOfIntervals) * bias;

  return Math.floor((Math.random() * whaleDistanceMax) + 1);
};