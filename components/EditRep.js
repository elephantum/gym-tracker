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

/*
props:
  repID
  onDone
*/
class EditRep extends Component {
  saveRep(rep) {
    this.props.dispatch({
      type: "SET_REP",
      repID: this.props.repID,
      rep: rep
    });
  }

  render() {
    return(
      <View flexDirection="column">
        <RepEditor
          rep={this.props.rep}
          actionText="Save"
          onEditDone={(rep) => {
            this.saveRep(rep);
            this.props.onDone();
          }}
          onCancel={() => this.props.onDone()}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    rep: state.reps[ownProps.repID]
  };
}

EditRep = connect(mapStateToProps)(EditRep);

export default EditRep;
