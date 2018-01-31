const actions = require('./actions').actions;

function bindAction(bound, args) {
  const store = require('./store');
  return store.dispatch(bound(args));
};

// for each action in action, return the bound version of that action
// pass any arguments called to that action as well
module.exports = Object.keys(actions).reduce((c, d, i) => {
  c[d] = (args) => bindAction(actions[d], args);
  return c;
}, {});