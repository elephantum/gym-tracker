import React, {
  AppRegistry,
  Navigator,
  View,
  StyleSheet,
  Component
} from 'react-native';

import { Provider } from 'react-redux';

import dataStore from './dataStore.js';

import DayView from './components/DayView.js';

class GymTracker extends Component {
  render() {
    return (
      <Provider
        store={dataStore}>
        <Navigator
          initialRoute={{name: "Day", component: DayView}}
          renderScene={(route, navigator) =>
            <View style={styles.container}>
              <route.component
                navigator={navigator}
                {...route.passProps}
              />
            </View>
          }
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  }
});

AppRegistry.registerComponent('GymTracker', () => GymTracker);
