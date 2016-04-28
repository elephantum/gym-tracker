import React, {
  AppRegistry,
  Component
} from 'react-native';

import { Provider } from 'react-redux';

import dataStore from './dataStore.js';

import DayView from './DayView.js';

class App extends Component {
  render() {
    return (
      <Provider
        store={dataStore}>
        <DayView/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GymTracker', () => App);
