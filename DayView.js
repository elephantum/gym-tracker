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

import ExcerciseView from './ExcerciseView.js';
import RepEditor from './RepEditor.js';

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
    excercise = this.props.data[excerciseID];
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
    excercise = this.props.data[excerciseID];

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

GymTracker = connect(GymTracker_mapStateToProps)(GymTracker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  }
});

export default GymTracker;
