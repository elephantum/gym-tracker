import { createStore } from 'redux';

import _ from 'underscore';

import { INITIAL_DATA } from './initial_data.js'

export function handleEvent(state, action) {
  switch(action.type) {
    case "TOGGLE_REP": {
      /*
      repID
      */

      return {
        ...state,
        reps: {
          ...state.reps,
          [action.repID]: {
            ...state.reps[action.repID],
            complete: !state.reps[action.repID].complete
          }
        }
      }
    }

    case "ADD_REP": {
      /*
      exerciseID
      rep
      */

      repID = Math.max(...Object.keys(state.reps)) + 1;

      newExercise = _.clone(state.exercises[action.exerciseID]);
      newExercise.reps = [...newExercise.reps, repID];

      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.exerciseID]: newExercise
        },
        reps: {
          ...state.reps,
          [repID]: action.rep
        }
      }
    }

    case "SET_REP": {
      /*
      repID
      rep
      */

      return {
        ...state,
        reps: {
          ...state.reps,
          [action.repID]: action.rep
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
