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


/*
state:
  editor - управление инлайн-редактором
    mode:
      none - редактирование не идет
      edit - редактируется повтор
      add - добавляется повтор
    exerciseID - идентификатор упражнения с редактором
    repID - идентификтор повтора с редактором (в случае edit)
*/
class DayView extends Component {
  constructor(props) {
    super(props);

    dayViewDataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => !_.isEqual(a, b)
    });

    this.state = {
      ds: dayViewDataSource.cloneWithRows(this._buildExercises("none"))
    }
  }

  _buildExercises(editMode, editExerciseID, editRepID) {
    return this.props.day.exercises.map((exerciseID) => {
      if(exerciseID == editExerciseID) {
        return {
          exerciseID,
          editMode,
          editRepID
        }
      } else {
        return {
          editMode: "none",
          exerciseID
        }
      }
    });
  }

  editRep(exerciseID, repID) {
    this.setState({
      ds: this.state.ds.cloneWithRows(this._buildExercises("edit", exerciseID, repID))
    });
  }

  addRep(exerciseID) {
    this.setState({
      ds: this.state.ds.cloneWithRows(this._buildExercises("add", exerciseID))
    });
  }

  closeEditor() {
    this.setState({
      ds: this.state.ds.cloneWithRows(this._buildExercises("none"))
    });
  }

  render() {
    if(!this.props.day) return (<Text>Empty</Text>);

    return (
      <View flex={1}>
        <BackButton navigator={this.props.navigator}/>
        <ListView
          flex={1}
          dataSource={this.state.ds}
          renderRow={(e) =>
            <ExerciseListItem
              navigator={this.props.navigator}
              exerciseID={e.exerciseID}

              editMode={e.editMode}
              editRepID={e.editRepID}

              onEditRep={(repID) => this.editRep(e.exerciseID, repID)}
              onAddRep={() => this.addRep(e.exerciseID)}
              onEditDone={() => this.closeEditor()}
            />
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
