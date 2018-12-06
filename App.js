import React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Text  } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ''
    };
  }

  addTask = (newTask) => {
    const numTasks = this.state.tasks.length;
    this.setState({
      tasks: this.state.tasks.concat([{
        id: numTasks,
        name: newTask
      }]),
      newTask: ''
    });
  };

  taskList = (arr) => {
    return arr.map(task =>
      <Text key={task.id}>{task.name}</Text>
    )
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.headerSection}>
          <Text>To Do List</Text>
          <TextInput
            style={styles.textInput}
            placeholder="enter new task"
            returnKeyType='done'
            value={this.state.newTask}
            onChangeText={newTask => this.setState({newTask})}
            onSubmitEditing={event => this.addTask(event.nativeEvent.text)}
          />
        </View>

        <View style={styles.tasksSection}>
          {this.taskList(this.state.tasks)}
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  headerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {height: 40},

  tasksSection: {
    flex: 4,
    alignItems: 'center',
  }

});
