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

import dataStore from './dataStore.js';

import { INITIAL_DATA } from './initial_data.js'

// редактор количества повторений и веса
class RepEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n: props.rep.n,
      weight: props.rep.weight
    };
  }

  render() {
    return (
      <View flexDirection="column">
        <View flexDirection="row">
          <Text>Reps: </Text>
          <TextInput
            defaultValue={"" + this.props.rep.n}
            style={{height: 40, width: 100, borderWidth: 1}}
            onChangeText={(txt) => {
              this.setState({n: parseInt(txt)});
            }}
            keyboardType="numeric"/>
        </View>
        <View flexDirection="row">
          <Text>Weight: </Text>
          <TextInput
            defaultValue={"" + (this.props.rep.weight !== undefined ? this.props.rep.weight : "")}
            style={{height: 40, width: 100, borderWidth: 1}}
            onChangeText={(txt) => {
              this.setState({weight: parseFloat(txt)});
            }}
            keyboardType="numeric"/>
        </View>
        <Text
          style={{fontSize: 20}}
          onPress={() => this.props.onEditDone({
            n: this.state.n,
            weight: this.state.weight,
            complete: true})}>
          Set Complete
        </Text>
      </View>
    );
  }
}

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
  constructor(props) {
    super(props);
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
                onPress={() => this.props.onToggleRep(this.props.excerciseID, repID)}
                onLongPress={() => this.props.onEditRep(this.props.excerciseID, repID)}>
                <Text
                  style={[styles.itemReps, rep.complete ? styles.complete : styles.incomplete]}
                >{rep.weight ? rep.weight + "кг * " : ""}{rep.n}{this.props.excercise.type == "mins" ? " мин" : ""}</Text>
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

class GymTracker extends Component {
  constructor(props) {
    super(props);

    this.dayViewDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  toggleRep(excerciseID, repID) {
    this.props.dispatch({
      type: "TOGGLE_REP",
      excerciseID: excerciseID,
      repID: repID
    });
  }

  saveRep(excerciseID, repID, rep) {
    this.props.dispatch({
      type: "SET_REP",
      excerciseID: excerciseID,
      repID: repID,
      rep: rep
    });
  }

  addRep(excerciseID, rep) {
    this.props.dispatch({
      type: "ADD_REP",
      excerciseID: excerciseID,
      rep: rep
    });
  }

  editRep(navigator, excerciseID, repID) {
    excercise = this.state.data[excerciseID];
    rep = excercise.reps[repID];

    this.setState({
      currentRep: {
        rep: _.clone(rep),
        excerciseID: excerciseID,
        repID: repID
      }
    });

    navigator.push({
      name: "Edit Rep",
      render: (r,n) => this.renderEditRep(r, n),
    })
  }

  renderEditRep(route, navigator) {
    return(
      <View flexDirection="column">
        <Text
          style={{fontSize: 20, marginBottom: 20}}
          onPress={() => navigator.pop()}>
          ← Back
        </Text>

        <RepEditor
          rep={this.state.currentRep.rep}
          onEditDone={(rep) => {
            this.saveRep(
              this.state.currentRep.excerciseID,
              this.state.currentRep.repID,
              rep
            );
            navigator.pop();
          }}
          />
      </View>
    );
  }

  goAddRep(navigator, excerciseID) {
    excercise = this.state.data[excerciseID];

    if(excercise.reps.length > 0) {
      rep = excercise.reps[excercise.reps.length - 1];
    } else {
      rep = {};
    }

    navigator.push({
      name: "Add Rep",
      rep: rep,
      excerciseID: excerciseID,
      render: (r,n) => this.renderAddRep(r,n)
    });
  }

  renderAddRep(route, navigator) {
    return(
      <View flexDirection="column">
        <Text
          style={{fontSize: 20, marginBottom: 20}}
          onPress={() => navigator.pop()}>
          Cancel
        </Text>

        <RepEditor
          rep={route.rep}
          onEditDone={(rep) => {
            this.addRep(
              route.excerciseID,
              rep
            );
            navigator.pop();
          }}
          />
      </View>
    );
  }

  renderDay(route, navigator) {
    console.log("render day");

    if(!this.props.data) return (<Text>Empty</Text>);

    this.dayViewDataSource = this.dayViewDataSource.cloneWithRows(this.props.data);

    return (
      <ListView
        dataSource={this.dayViewDataSource}
        renderRow={(item, sectionID, itemID, highlightRow) =>
          <ExcerciseView
            excerciseID={itemID}
            excercise={item}
            onToggleRep={(e, r) => this.toggleRep(e, r)}
            onEditRep={(e, r) => this.editRep(navigator, e, r)}
            onAddRep={(e) => this.goAddRep(navigator, e)}
            />
        }
      />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: "Day", render: (r,n) => this.renderDay(r,n)}}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
            {route.render(route, navigator)}
          </View>
        }
      />
    );
  }
}

function GymTracker_mapStateToProps(state) {
  console.log("remap state to props");
  return {data: state};
}

GymTracker = connect(GymTracker_mapStateToProps)(GymTracker)

class App extends Component {
  render() {
    return (
      <Provider
        store={dataStore}>
        <GymTracker/>
      </Provider>
    );
  }
}

zoomK = 1.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  item: {
    paddingTop: 10*zoomK,
    paddingBottom: 10*zoomK,
    paddingLeft: 10*zoomK,
    paddingRight: 10*zoomK
  },
  itemText: {
    fontSize: 18*zoomK
  },
  itemReps: {
    padding: 5*zoomK,
    margin: 2*zoomK
  },
  complete: {
    backgroundColor: "lightgreen"
  },
  incomplete: {
    backgroundColor: "lightgray"
  }
});

AppRegistry.registerComponent('GymTracker', () => App);
