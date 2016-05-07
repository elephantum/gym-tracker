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

import { Provider, connect } from 'react-redux';

import _ from 'underscore';

import ExcerciseListItem from './ExcerciseListItem.js';

class DayView extends Component {
  constructor(props) {
    super(props);
    this.dayViewDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  render() {
    if(!this.props.day) return (<Text>Empty</Text>);

    this.dayViewDataSource = this.dayViewDataSource.cloneWithRows(this.props.day.excercises);

    return (
      <View>
        <Text>{this.props.day.date}</Text>
        <ListView
          dataSource={this.dayViewDataSource}
          renderRow={(item, sectionID, itemID, highlightRow) =>
            <ExcerciseListItem
              navigator={this.props.navigator}
              dayID={this.props.dayID}
              excerciseID={itemID}/>
          }
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    day: state[ownProps.dayID]
  };
}

DayView = connect(mapStateToProps)(DayView);

export default DayView;
