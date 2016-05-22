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
  exerciseID
  onDone
*/
class AddRep extends Component {
  addRep(rep) {
    this.props.dispatch({
      type: "ADD_REP",
      exerciseID: this.props.exerciseID,
      rep: rep
    });
  }

  render() {
    return(
      <View flexDirection="column">
        <RepEditor
          rep={this.props.rep}
          actionText="Add"
          onEditDone={(rep) => {
            this.addRep(rep);
            this.props.onDone();
          }}
          onCancel={() => this.props.onDone()}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  exercise = state.exercises[ownProps.exerciseID];

  if(exercise.reps.length == 0) {
    rep = {}
  } else {
    rep = state.reps[exercise.reps[exercise.reps.length - 1]];
  }

  return {
    ...ownProps,
    rep: rep
  };
}

AddRep = connect(mapStateToProps)(AddRep);

export default AddRep;
