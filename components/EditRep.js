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

import RepEditor from './RepEditor.js';

class EditRep extends Component {
  saveRep(rep) {
    this.props.dispatch({
      type: "SET_REP",
      excerciseID: this.props.excerciseID,
      repID: this.props.repID,
      rep: rep
    });
  }

  render() {
    return(
      <View flexDirection="column">
        <Text
          style={{fontSize: 20, marginBottom: 20}}
          onPress={() => this.props.navigator.pop()}>
          ← Back
        </Text>

        <RepEditor
          rep={this.props.rep}
          onEditDone={(rep) => {
            this.saveRep(
              rep
            );
            this.props.navigator.pop();
          }}
          />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    rep: state[ownProps.excerciseID].reps[ownProps.repID]
  };
}

EditRep = connect(mapStateToProps)(EditRep);

export default EditRep;
