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

import ExcerciseView from './ExcerciseView.js';

class DayView extends Component {
  constructor(props) {
    super(props);
    this.dayViewDataSource = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  }

  render() {
    if(!this.props.data) return (<Text>Empty</Text>);

    this.dayViewDataSource = this.dayViewDataSource.cloneWithRows(this.props.data);

    return (
      <ListView
        dataSource={this.dayViewDataSource}
        renderRow={(item, sectionID, itemID, highlightRow) =>
          <ExcerciseView
            navigator={this.props.navigator}
            excerciseID={itemID}/>
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {data: state};
}

DayView = connect(mapStateToProps)(DayView);

export default DayView;
