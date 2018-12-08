import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements'

import '@expo/vector-icons';

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
        key: numTasks.toString(),
        name: newTask,
        completed: false
      }]),
      newTask: ''
    });
  };

  toggleCompleted = (key) => {
    const tasks = this.state.tasks;
    tasks[key].completed = !tasks[key].completed;
    this.setState({tasks})
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.headerSection}>
          <MyText style={styles.titleText}>To Do List</MyText>
          <TextInput
            style={mergeStyles([styles.textInput, styles.baseText, styles.task])}
            placeholder="enter new task"
            returnKeyType='done'
            value={this.state.newTask}
            onChangeText={newTask => this.setState({newTask})}
            onSubmitEditing={event => this.addTask(event.nativeEvent.text)}
          />
        </View>

        <View style={styles.tasksSection}>
          <TaskList tasks={this.state.tasks.filter(t => !t.completed)}
                    toggleCompleted={this.toggleCompleted} />
        </View>

        <View style={styles.tasksSection}>
          <MyText style={styles.titleText}>Completed</MyText>
          <TaskList tasks={this.state.tasks.filter(t => t.completed)}
                    toggleCompleted={this.toggleCompleted} />
        </View>

      </SafeAreaView>
    );
  }
}

class MyText extends React.Component {
  render() {
    const mergedStyles = mergeStyles([styles.baseText, this.props.style]);
    return (
      <Text style={mergedStyles}>{this.props.children}</Text>
    );
  }
}

class TaskList extends  React.PureComponent {

  render() {
    return (
      <FlatList
        data={this.props.tasks}
        renderItem={({item}) => <Task task={item} onToggle={this.props.toggleCompleted}/>}
      />
    );
  }
}

class Task extends React.PureComponent {
  onToggle = () => {
    this.props.onToggle(this.props.task.key)
  };

  render() {
    return (
      <CheckBox
        title={this.props.task.name}
        textStyle={styles.baseText}
        checked={this.props.task.completed}
        onPress={this.onToggle}
      />
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
    fontSize: 20
  },

  headerSection: {
    flex: 1,
    justifyContent: 'center'
  },

  titleText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 30,
    marginBottom: 20
  },

  textInput: {
    height: 50,
    borderRadius: 5
  },

  tasksSection: {
    flex: 2,
  },

  task: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.125)',
    marginLeft: 10,
    marginRight: 10
  }

});

function mergeStyles(stylesArr) {
  const mergedStyles = {};
  for (let style of stylesArr){
    Object.assign(mergedStyles, style);
  }
  return mergedStyles
}
