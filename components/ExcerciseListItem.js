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
  excerciseID
  excercise :: {
    reps :: [rep]
  }
  onToggleRep(excerciseID, repID)
  onEditRep(excerciseID, repID)
  onAddRep(excerciseID)
}
*/
class ExcerciseListItem extends Component {
  toggleRep(repID) {
    this.props.dispatch({
      type: "TOGGLE_REP",
      dayID: this.props.dayID,
      excerciseID: this.props.excerciseID,
      repID: repID
    });
  }

  goEditRep(excerciseID, repID) {
    this.props.navigator.push({
      name: "Edit Rep",
      component: EditRep,
      passProps: {
        dayID: this.props.dayID,
        excerciseID: excerciseID,
        repID: repID
      }
    });
  }

  goAddRep(excerciseID) {
    this.props.navigator.push({
      name: "Add Rep",
      component: AddRep,
      passProps: {
        dayID: this.props.dayID,
        excerciseID: excerciseID
      }
    });
  }

  render() {
    totalReps = this.props.excercise.reps.length;
    completeReps = this.props.excercise.reps.filter((x) => x.complete).length;

    excerciseComplete = totalReps == completeReps;

    return (
      <View flexDirection="column" style={[globalStyle.listItem, excerciseComplete ? styles.complete : {}]}>
        <Text style={globalStyle.listItemTitleText}>
          {completeReps}/{totalReps}
          {" "}
          {this.props.excercise.name}
        </Text>
        <View flexDirection="row" flexWrap="wrap" alignItems="flex-start">
          {this.props.excercise.reps.map((rep,repID) =>
            <View key={"rep-" + repID}>
              <TouchableHighlight
                onPress={() => this.toggleRep(repID)}
                onLongPress={() => this.goEditRep(this.props.excerciseID, repID)}>
                <Text
                  style={[styles.itemReps, rep.complete ? styles.complete : styles.incomplete]}
                >
                  {rep.weight ? rep.weight + "кг * " : ""}
                  {rep.n}
                  {this.props.excercise.type == "mins" ? " мин" : ""}
                </Text>
              </TouchableHighlight>
            </View>
          )}
          <TouchableHighlight
            onPress={() => this.goAddRep(this.props.excerciseID)}>
            <Text style={[styles.itemReps, excerciseComplete ? styles.complete : styles.incomplete]}>
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
    excercise: state[ownProps.dayID].excercises[ownProps.excerciseID]
  };
}

ExcerciseListItem = connect(mapStateToProps)(ExcerciseListItem);

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

export default ExcerciseListItem;
