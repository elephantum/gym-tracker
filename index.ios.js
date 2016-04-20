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

import _ from 'underscore';

import {INITIAL_DATA} from './initial_data.js'

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

class GymTracker extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
    this.state = {
      data: INITIAL_DATA,
      currentList: ds.cloneWithRows(INITIAL_DATA)
    };
  }

  toggleRep(excerciseID, repID) {
    t = this.state.data.slice();
    t[excerciseID] = _.clone(t[excerciseID]);
    t[excerciseID].reps[repID].complete = ! t[excerciseID].reps[repID].complete;

    this.setState({
      data:t,
      currentList: this.state.currentList.cloneWithRows(t)
    });
  }

  saveRep(excerciseID, repID, rep) {
    t = this.state.data.slice();
    t[excerciseID] = _.clone(t[excerciseID]);
    t[excerciseID].reps[repID] = rep;

    this.setState({
      data:t,
      currentList: this.state.currentList.cloneWithRows(t)
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

    navigator.push(
      {
        name: "Edit Rep",
        render: (r,n) => this.renderEditRep(r, n),
      }
    )
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

  renderOneItem(navigator, item, sectionID, excerciseID, highlightRow) {
    totalReps = item.reps.length
    completeReps = item.reps.filter((x) => x.complete).length

    return (
      <View flexDirection="column" style={[styles.item, totalReps == completeReps ? styles.complete : {}]}>
        <Text style={styles.itemText}>
          {completeReps}/{totalReps}
          {" "}
          {item.name}
        </Text>
        <View flexDirection="row" flexWrap="wrap" alignItems="flex-start">
          {item.reps.map((rep,repID) =>
            <View key={"rep-" + repID}>
              <TouchableHighlight
                onPress={() => this.toggleRep(excerciseID, repID)}
                onLongPress={() => this.editRep(navigator, excerciseID, repID)}>
                <Text
                  style={[styles.itemReps, rep.complete ? styles.complete : styles.incomplete]}
                >{rep.weight ? rep.weight + "кг * " : ""}{rep.n}{item.type == "mins" ? " мин" : ""}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    );
  }

  renderDay(route, navigator) {
    return (
      <ListView
        dataSource={this.state.currentList}
        renderRow={(item, sectionID, excerciseID, highlightRow) => this.renderOneItem(navigator, item, sectionID, excerciseID, highlightRow)}
      />
    );
  }

  renderStartScene(route, navigator) {
    return (
      <Text
        style={{fontSize: 24}}
        onPress={() => navigator.push({name: "Day", render: (r,n) => this.renderDay(r,n)})}
        >
        Start!
      </Text>
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: "Start", render: (route, navigator) => this.renderStartScene(route, navigator)}}
        renderScene={(route, navigator) =>
          <View style={styles.container}>
            {route.render(route, navigator)}
          </View>
        }
      />
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

AppRegistry.registerComponent('GymTracker', () => GymTracker);
