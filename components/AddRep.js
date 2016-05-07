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

class AddRep extends Component {
  addRep(rep) {
    this.props.dispatch({
      type: "ADD_REP",
      dayID: this.props.dayID,
      excerciseID: this.props.excerciseID,
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
            this.addRep(rep);
            this.props.navigator.pop();
          }}
          />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  excercise = state[ownProps.dayID].excercises[ownProps.excerciseID];

  if(excercise.reps.length == 0) {
    rep = {}
  } else {
    rep = excercise.reps[excercise.reps.length - 1];
  }

  return {
    ...ownProps,
    rep: rep
  };
}

AddRep = connect(mapStateToProps)(AddRep);

export default AddRep;
