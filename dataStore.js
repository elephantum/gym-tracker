import { createStore } from 'redux';

import _ from 'underscore';

import { INITIAL_DATA } from './initial_data.js'

export function handleEvent(state, action) {
  switch(action.type) {
    case "TOGGLE_REP": {
      /*
      exerciseID
      repID
      */

      newExercise = _.clone(state.exercises[action.exerciseID]);

      newExercise.reps[action.repID] = {
        ...newExercise.reps[action.repID],
        complete: !newExercise.reps[action.repID].complete
      };

      newExercises = {
        ...state.exercises,
        [action.exerciseID]: newExercise
      }

      return {
        ...state,
        exercises: newExercises
      }
    }

    case "ADD_REP": {
      /*
      exerciseID
      rep
      */

      newExercise = _.clone(state.exercises[action.exerciseID]);
      newExercise.reps.push(action.rep);

      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.exerciseID]: newExercise
        }
      }
    }

    case "SET_REP": {
      /*
      exerciseID
      repID
      rep
      */

      newExercise = _.clone(state.exercises[action.exerciseID]);

      newExercise.reps[action.repID] = action.rep;

      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.exerciseID]: newExercise
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
