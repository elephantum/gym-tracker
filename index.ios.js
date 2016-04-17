/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Alert,
  AppRegistry,
  Component,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  View
} from 'react-native';

import _ from 'underscore';

var INITIAL_DATA = [
  {
    name: "Эллипс",
    reps: [
      {
        type: "mins",
        n: 5
      }
    ]
  },
  {
    name: "Пресс",
    reps: [
      { n: 20 },
      { n: 20 },
      { n: 20 },
    ]
  },
  {
    name: "Подъем ног",
    reps: [
      { n: 15 },
      { n: 15 },
      { n: 15 },
    ]
  },
  {
    name: "Спина-дельта",
    reps: [
      {
        n: 15,
        weight: 40
      },
      {
        n: 15,
        weight: 40
      },
      {
        n: 15,
        weight: 40
      },
    ]
  },
  {
    name: "Спина-наклоны назад",
    reps: [
      {
        n: 15,
        weight: 50
      },
      {
        n: 15,
        weight: 50
      },
      {
        n: 15,
        weight: 50
      },
    ]
  },
  {
    name: "Колени разгиб",
    reps: [
      {
        n: 20,
        weight: 20
      },
      {
        n: 20,
        weight: 20
      },
      {
        n: 20,
        weight: 20
      },
      {
        n: 20,
        weight: 20
      },
      {
        n: 20,
        weight: 20
      },
    ],
  },
  {
    name: "Колени сгибания",
    reps: [
      {
        n: 15,
        weight: 50,
      },
      {
        n: 15,
        weight: 50,
      },
      {
        n: 15,
        weight: 50,
      },
    ]
  },
  {
    name: "Грудные мышцы",
    reps: [
      {
        n: 15,
        weight: 40.5,
      },
      {
        n: 15,
        weight: 40.5,
      },
      {
        n: 15,
        weight: 40.5,
      },
    ]
  },
  {
    name: "Трицепц",
    reps: [
      {
        n: 15,
        weight: 29,
      },
      {
        n: 15,
        weight: 29,
      },
      {
        n: 15,
        weight: 29,
      },
    ]
  },
  {
    name: "Бицепц",
    reps: [
      {
        n: 10,
        weight: 10,
      },
      {
        n: 10,
        weight: 10,
      },
      {
        n: 10,
        weight: 10,
      },
    ]
  },
  {
    name: "Эллипс",
    reps: [
      {
        type: "mins",
        n: 5,
      }
    ]
  }
];

class GymTracker extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
    this.state = {
      data: INITIAL_DATA,
      currentList: ds.cloneWithRows(INITIAL_DATA)
    };
  }

  toggleRep(rowID, repID) {
    //Alert.alert(`${rowID}, ${repID}`, "");

    t = this.state.data.slice();
    t[rowID] = _.clone(t[rowID]);
    t[rowID].reps[repID].complete = ! t[rowID].reps[repID].complete;

    this.setState({
      data:t,
      currentList: this.state.currentList.cloneWithRows(t)
    });
  }

  renderOneItem(item, sectionID, rowID, highlightRow) {
    totalReps = item.reps.length
    completeReps = item.reps.filter((x) => x.complete).length

    return (
      <View flexDirection="column" style={[styles.item, totalReps == completeReps ? styles.complete : {}]}>
        <Text style={styles.itemText}>
          {completeReps}/{totalReps}
          {" "}
          {item.name}
        </Text>
        <View flexDirection="row" flexWrap="wrap" alignItems="flex-start">
          {item.reps.map((rep,i) =>
            <View key={"rep-" + i}>
              <TouchableHighlight
                onPress={() => this.toggleRep(rowID, i)}
                onLongPress={() => Alert.alert("Long press")}>
                <Text
                  style={[styles.itemReps, rep.complete ? styles.complete : styles.incomplete]}
                >{rep.weight ? rep.weight + "кг * " : ""}{rep.n}{rep.type == "mins" ? " мин" : ""}</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.currentList}
          renderRow={(a,b,c,d) => this.renderOneItem(a,b,c,d)}
        />
      </View>
    );
  }
}

zoomK = 1.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  item: {
    paddingTop: 10*zoomK,
    paddingBottom: 10*zoomK,
    paddingLeft: 10*zoomK,
    paddingRight: 10*zoomK
  },
  itemText: {
    fontSize: 18*zoomK
  },
  itemReps: {
    padding: 5*zoomK,
    margin: 2*zoomK
  },
  complete: {
    backgroundColor: "lightgreen"
  },
  incomplete: {
    backgroundColor: "lightgray"
  }
});

AppRegistry.registerComponent('GymTracker', () => GymTracker);
