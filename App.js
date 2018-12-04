import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ''
    };
  }

  addTask = (newTask) => {
    this.setState({
      tasks: this.state.tasks.concat([newTask]),
      newTask: ''
    });
  };

  taskList = (arr) => {
    return arr.map(task =>
      <Text>{task}</Text>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>To Do List</Text>
        <TextInput
          placeholder="enter new task"
          returnKeyType='done'
          value={this.state.newTask}
          onChangeText={newTask => this.setState({newTask})}
          onSubmitEditing={event => this.addTask(event.nativeEvent.text)}
        />
        {this.taskList(this.state.tasks)}
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
