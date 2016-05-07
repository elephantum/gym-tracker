import React, {
  Component,
  Text
} from 'react-native';

export default class BackButton extends Component {
  render() {
    return (
      <Text
        style={{fontSize: 20, marginBottom: 20}}
        onPress={() => this.props.navigator.pop()}>
        ← Back
      </Text>
    );
  }
}
