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

import BackButton from './BackButton.js';
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
        <BackButton navigator={this.props.navigator}/>

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
    rep: state.excercises[ownProps.excerciseID].reps[ownProps.repID]
  };
}

EditRep = connect(mapStateToProps)(EditRep);

export default EditRep;
