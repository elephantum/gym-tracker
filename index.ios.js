/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var INITIAL_DATA = [
  {
    id: 1,
    name: "Пресс",
    completed: true
  },
  {
    id: 2,
    name: "Ноги",
    completed: false
  },
  {
    id: 3,
    name: "Дельта",
    completed: false
  }
];

class GymTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {"data": INITIAL_DATA};
  }

  renderOneItem(item) {
    return (
      <View flexDirection="row" alignItems="flex-start" key={"item-" + item.id}>
        <Text>[{item.completed ? "x" : " "}]</Text>
        <Text>{item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.map((x,i) => this.renderOneItem(x))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GymTracker', () => GymTracker);
