import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>To Do List</Text>
        <TextInput
          style={{height: 40}}
          placeholder="enter new task"
          onChangeText={(text) => this.setState({text})}
        />
        <Text>new task: {this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
