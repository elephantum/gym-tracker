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

import globalStyle from '../globalStyle.js';

class DayList extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  render() {
    this.listDataSource = this.listDataSource.cloneWithRows(_.keys(this.props.days));

    return (
      <View flex={1}>
        <ListView
          flex={1}
          dataSource={this.listDataSource}
          renderRow={(item) => (
            <TouchableHighlight
              style={globalStyle.listItem}
              onPress={() => this.props.navigator.push({
                component: DayView,
                passProps: {
                  dayID: item
                }
              })}
              >
              <Text style={globalStyle.listItemTitleText}>{item}</Text>
            </TouchableHighlight>
          )}
          />
      </View>
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
});

export default DayList;
