import React, {
  Alert,
  AppRegistry,
  Component,
  ListView,
  Navigator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import { Provider, connect } from 'react-redux';

import _ from 'underscore';

import AddRep from './AddRep.js';
import EditRep from './EditRep.js';

import globalStyle from '../globalStyle.js';

/*
props :: {
  exerciseID
  exercise :: {
    reps :: [rep]
  }
  onToggleRep(exerciseID, repID)
  onEditRep(exerciseID, repID)
  onAddRep(exerciseID)
}
*/
class ExerciseListItem extends Component {
  toggleRep(repID) {
    this.props.dispatch({
      type: "TOGGLE_REP",
      repID: repID
    });
  }

  goEditRep(exerciseID, repID) {
    this.props.navigator.push({
      name: "Edit Rep",
      component: EditRep,
      passProps: {
        repID: repID
      }
    });
  }

  goAddRep(exerciseID) {
    this.props.navigator.push({
      name: "Add Rep",
      component: AddRep,
      passProps: {
        exerciseID: exerciseID
      }
    });
  }

  render() {
    console.log(this.props.exercise);
    console.log(this.props.reps);

    totalReps = this.props.exercise.reps.length;
    completeReps = this.props.exercise.reps.filter((x) => this.props.reps[x].complete).length;

    exerciseComplete = totalReps == completeReps;

    return (
      <View flexDirection="column" style={[globalStyle.listItem, exerciseComplete ? styles.complete : {}]}>
        <Text style={globalStyle.listItemTitleText}>
          {completeReps}/{totalReps}
          {" "}
          {this.props.exercise.name}
        </Text>
        <View flexDirection="row" flexWrap="wrap" alignItems="flex-start">
          {this.props.exercise.reps.map((repID) => {
            rep = this.props.reps[repID];
            return (
              <View key={"rep-" + repID}>
                <TouchableHighlight
                  onPress={() => this.toggleRep(repID)}
                  onLongPress={() => this.goEditRep(this.props.exerciseID, repID)}>
                  <Text
                    style={[styles.itemReps, rep.complete ? styles.complete : styles.incomplete]}
                  >
                    {rep.weight ? rep.weight + "кг * " : ""}
                    {rep.n}
                    {this.props.exercise.type == "mins" ? " мин" : ""}
                  </Text>
                </TouchableHighlight>
              </View>
            );
          })}
          <TouchableHighlight
            onPress={() => this.goAddRep(this.props.exerciseID)}>
            <Text style={[styles.itemReps, exerciseComplete ? styles.complete : styles.incomplete]}>
            +
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    exercise: state.exercises[ownProps.exerciseID],
    reps: _.pick(state.reps, state.exercises[ownProps.exerciseID].reps)
  };
}

ExerciseListItem = connect(mapStateToProps)(ExerciseListItem);

const styles = StyleSheet.create({
  itemReps: {
    padding: 7,
    margin: 3
  },
  complete: {
    backgroundColor: "lightgreen"
  },
  incomplete: {
    backgroundColor: "lightgray"
  }
});

export default ExerciseListItem;
