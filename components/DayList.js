import React, {
  Alert,
  AppRegistry,
  Component,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import { connect } from 'react-redux';

import _ from 'underscore';

import DayView from './DayView.js';

class DayList extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  render() {
    this.listDataSource = this.listDataSource.cloneWithRows(_.keys(this.props.days));

    return (
      <ListView
        dataSource={this.listDataSource}
        renderRow={(item) => (
          <TouchableHighlight
            onPress={() => this.props.navigator.push({
              component: DayView,
              passProps: {
                dayID: item
              }
            })}
            >
            <Text style={styles.dayName}>{item}</Text>
          </TouchableHighlight>
        )}
        />
    );
  }
}

function mapStateToProps(state) {
  return {
    days: state
  };
}

DayList = connect(mapStateToProps)(DayList);

var styles = StyleSheet.create({
  dayName: {
    fontSize: 24
  }
});

export default DayList;
