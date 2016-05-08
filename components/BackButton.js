import React, {
  Component,
  Text
} from 'react-native';

export default class BackButton extends Component {
  render() {
    return (
      <Text
        style={{fontSize: 20, margin: 5}}
        onPress={() => this.props.navigator.pop()}>
        ← Back
      </Text>
    );
  }
}
