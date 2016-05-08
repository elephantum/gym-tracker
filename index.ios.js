import React, {
  AppRegistry,
  Navigator,
  View,
  StyleSheet,
  Component
} from 'react-native';

import { Provider } from 'react-redux';

import { getInitialStore } from './dataStore.js';

var dataStore = getInitialStore();

import DayList from './components/DayList.js';

class GymTracker extends Component {
  render() {
    return (
      <Provider
        store={dataStore}>
        <Navigator
          initialRoute={{name: "Day", component: DayList, passProps: {dayID: "2016-04-06"}}}
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
