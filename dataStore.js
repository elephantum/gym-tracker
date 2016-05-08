import { createStore } from 'redux';

import _ from 'underscore';

import { INITIAL_DATA } from './initial_data.js'

export function handleEvent(state, action) {
  switch(action.type) {
    case "TOGGLE_REP": {
      /*
      excerciseID
      repID
      */

      newExcercise = _.clone(state.excercises[action.excerciseID]);

      newExcercise.reps[action.repID] = {
        ...newExcercise.reps[action.repID],
        complete: !newExcercise.reps[action.repID].complete
      };

      newExcercises = {
        ...state.excercises,
        [action.excerciseID]: newExcercise
      }

      return {
        ...state,
        excercises: newExcercises
      }
    }

    case "ADD_REP": {
      /*
      excerciseID
      rep
      */

      newExcercise = _.clone(state.excercises[action.excerciseID]);
      newExcercise.reps.push(action.rep);

      return {
        ...state,
        excercises: {
          ...state.excercises,
          [action.excerciseID]: newExcercise
        }
      }
    }

    case "SET_REP": {
      /*
      excerciseID
      repID
      rep
      */

      newExcercise = _.clone(state.excercises[action.excerciseID]);

      newExcercise.reps[action.repID] = action.rep;

      return {
        ...state,
        excercises: {
          ...state.excercises,
          [action.excerciseID]: newExcercise
        }
      }
    }
    default: {
      return state;
    }
  }
}

export function getInitialStore() {
  return createStore(handleEvent, INITIAL_DATA);
}
