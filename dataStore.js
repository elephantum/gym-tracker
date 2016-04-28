import { createStore } from 'redux';

import _ from 'underscore';

import { INITIAL_DATA } from './initial_data.js'

function handleEvent(state, action) {
  switch(action.type) {
    case "TOGGLE_REP": {
      newState = _.clone(state);
      newExcercise = _.clone(newState[action.excerciseID]);
      newRep = _.clone(newExcercise.reps[action.repID]);

      newRep.complete = !newRep.complete;

      newExcercise.reps[action.repID] = newRep;
      newState[action.excerciseID] = newExcercise;

      return newState;
    }
    case "ADD_REP": {
      newState = _.clone(state);
      newExcercise = _.clone(newState[action.excerciseID]);

      newExcercise.reps.push(action.rep);
      newState[action.excerciseID] = newExcercise;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default dataStore = createStore(handleEvent, INITIAL_DATA);
