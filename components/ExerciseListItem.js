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
props:
  editMode:
    none - редактора нет
    add - добавление повтора
    edit - редактирование повтора
  editRepID - идентификатор редактируемого повтора

  onEditRep - колбек для редактирования повтора
  onAddRep - колбек для добавления повтора
  onEditDone - колбек для закрытия редактора
*/
class ExerciseListItem extends Component {
  toggleRep(repID) {
    this.props.dispatch({
      type: "TOGGLE_REP",
      repID: repID
    });
  }

  render() {
    totalReps = this.props.exercise.reps.length;
    completeReps = this.props.exercise.reps.filter((x) => this.props.reps[x].complete).length;

    exerciseComplete = totalReps == completeReps;

    if(this.props.editMode == "add") {
      modeElem = (
        <AddRep
          exerciseID={this.props.exerciseID}
          onDone={this.props.onEditDone}
        />
      );
    } else if (this.props.editMode == "edit") {
      modeElem = (
        <EditRep
          repID={this.props.editRepID}
          onDone={this.props.onEditDone}
        />
      );
    } else {
      modeElem = [];
    }

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
                  onLongPress={() => this.props.onEditRep(repID)}>
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
            onPress={() => this.props.onAddRep()}>
            <Text style={[styles.itemReps, exerciseComplete ? styles.complete : styles.incomplete]}>
            +
            </Text>
          </TouchableHighlight>
        </View>
        {modeElem}
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
