import { createStore } from 'redux';

import _ from 'underscore';

import { INITIAL_DATA } from './initial_data.js'

export function handleEvent(state, action) {
  switch(action.type) {
    case "TOGGLE_REP": {
      /*
      dayID
      excerciseID
      repID
      */

      newState = _.clone(state);
      newDay = _.clone(newState[action.dayID]);
      newExcercise = _.clone(newDay.excercises[action.excerciseID]);
      newRep = _.clone(newExcercise.reps[action.repID]);

      newRep.complete = !newRep.complete;

      newExcercise.reps[action.repID] = newRep;
      newDay.excercises[action.excerciseID] = newExcercise;
      newState[action.dayID] = newDay;

      return newState;
    }
    case "ADD_REP": {
      /*
      dayID
      excerciseID
      rep
      */

      newState = _.clone(state);
      newDay = _.clone(newState[action.dayID]);
      newExcercise = _.clone(newDay.excercises[action.excerciseID]);

      newExcercise.reps.push(action.rep);
      newDay.excercises[action.excerciseID] = newExcercise;
      newState[action.dayID] = newDay;

      return newState;
    }
    case "SET_REP": {
      /*
      dayID
      excerciseID
      repID
      rep
      */

      newState = _.clone(state);
      newDay = _.clone(newState[action.dayID]);
      newExcercise = _.clone(newDay.excercises[action.excerciseID]);

      newExcercise.reps[action.repID] = action.rep;
      newDay.excercises[action.excerciseID] = newExcercise;
      newState[action.dayID] = newDay;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export function getInitialStore() {
  return createStore(handleEvent, INITIAL_DATA);
}
