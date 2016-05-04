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

// редактор количества повторений и веса
class RepEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n: props.rep.n,
      weight: props.rep.weight
    };
  }

  render() {
    return (
      <View flexDirection="column">
        <View flexDirection="row">
          <Text>Reps: </Text>
          <TextInput
            defaultValue={"" + this.props.rep.n}
            style={{height: 40, width: 100, borderWidth: 1}}
            onChangeText={(txt) => {
              this.setState({n: parseInt(txt)});
            }}
            keyboardType="numeric"/>
        </View>
        <View flexDirection="row">
          <Text>Weight: </Text>
          <TextInput
            defaultValue={"" + (this.props.rep.weight !== undefined ? this.props.rep.weight : "")}
            style={{height: 40, width: 100, borderWidth: 1}}
            onChangeText={(txt) => {
              this.setState({weight: parseFloat(txt)});
            }}
            keyboardType="numeric"/>
        </View>
        <Text
          style={{fontSize: 20}}
          onPress={() => this.props.onEditDone({
            n: this.state.n,
            weight: this.state.weight,
            complete: true})}>
          Set Complete
        </Text>
      </View>
    );
  }
}

export default RepEditor;
