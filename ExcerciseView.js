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

const styles = StyleSheet.create({
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  itemText: {
    fontSize: 24
  },
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
class ExcerciseView extends Component {
  toggleRep(repID) {
    this.props.dispatch({
      type: "TOGGLE_REP",
      excerciseID: this.props.excerciseID,
      repID: repID
    });
  }

  render() {
    totalReps = this.props.excercise.reps.length;
    completeReps = this.props.excercise.reps.filter((x) => x.complete).length;

    excerciseComplete = totalReps == completeReps;

    return (
      <View flexDirection="column" style={[styles.item, excerciseComplete ? styles.complete : {}]}>
        <Text style={styles.itemText}>
          {completeReps}/{totalReps}
          {" "}
          {this.props.excercise.name}
        </Text>
        <View flexDirection="row" flexWrap="wrap" alignItems="flex-start">
          {this.props.excercise.reps.map((rep,repID) =>
            <View key={"rep-" + repID}>
              <TouchableHighlight
                onPress={() => this.toggleRep(repID)}
                onLongPress={() => this.props.onEditRep(this.props.excerciseID, repID)}>
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
            onPress={() => this.props.onAddRep(this.props.excerciseID)}>
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
    excercise: state[ownProps.excerciseID]
  };
}

ExcerciseView = connect(mapStateToProps)(ExcerciseView);

export default ExcerciseView;
