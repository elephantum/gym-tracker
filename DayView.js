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
import AddRep from './AddRep.js';
import EditRep from './EditRep.js';

class DayView extends Component {
  constructor(props) {
    super(props);
    this.dayViewDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  editRep(navigator, excerciseID, repID) {
    navigator.push({
      name: "Edit Rep",
      render: (r,n) => this.renderEditRep(r, n),
      passProps: {
        excerciseID: excerciseID,
        repID: repID
      }
    });
  }

  renderEditRep(route, navigator) {
    return(
      <EditRep
        navigator={navigator}
        {...route.passProps}
      />
    );
  }

  goAddRep(navigator, excerciseID) {
    navigator.push({
      name: "Add Rep",
      render: (r,n) => this.renderAddRep(r,n),
      passProps: {
        excerciseID: excerciseID
      }
    });
  }

  renderAddRep(route, navigator) {
    return(
      <AddRep
        navigator={navigator}
        {...route.passProps}
      />
    );
  }

  renderDay(route, navigator) {
    if(!this.props.data) return (<Text>Empty</Text>);

    this.dayViewDataSource = this.dayViewDataSource.cloneWithRows(this.props.data);

    return (
      <ListView
        dataSource={this.dayViewDataSource}
        renderRow={(item, sectionID, itemID, highlightRow) =>
          <ExcerciseView
            excerciseID={itemID}
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

function mapStateToProps(state) {
  return {data: state};
}

DayView = connect(mapStateToProps)(DayView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  }
});

export default DayView;
