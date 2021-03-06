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

import BackButton from './BackButton.js';
import ExerciseListItem from './ExerciseListItem.js';

class DayView extends Component {
  constructor(props) {
    super(props);
    this.dayViewDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  render() {
    if(!this.props.day) return (<Text>Empty</Text>);

    this.dayViewDataSource = this.dayViewDataSource.cloneWithRows(this.props.day.exercises);

    return (
      <View flex={1}>
        <BackButton navigator={this.props.navigator}/>
        <ListView
          flex={1}
          dataSource={this.dayViewDataSource}
          renderRow={(exerciseID, sectionID, itemID, highlightRow) =>
            <ExerciseListItem
              navigator={this.props.navigator}
              exerciseID={exerciseID}/>
          }
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    day: state.days[ownProps.dayID]
  };
}

DayView = connect(mapStateToProps)(DayView);

export default DayView;
