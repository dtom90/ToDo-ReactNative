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
      <MyText style={styles.task} key={task.id}>{task.name}</MyText>
    )
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.headerSection}>
          <MyText style={{fontSize: 30}}>To Do List</MyText>
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

class MyText extends React.Component {
  render() {
    const mergedStyles = Object.assign(this.props.style || {}, styles.baseText);
    return (
      <Text style={mergedStyles}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  baseText: {
    fontFamily: 'Avenir',
  },

  headerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  textInput: {
    fontFamily: 'Avenir',
    height: 40
  },

  tasksSection: {
    flex: 4,
    alignItems: 'center',
  },

  task: {
    margin: 10
  }

});
