import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ToolbarAndroidBase } from 'react-native';
import Header from './components/header'
import InputBar from './components/inputbar'
import TodoItem from './components/todoitem'

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      todoInput: '',
      todos: [
        {
          id: 0, title: 'Take out the trash', done: false
        },
        {
          id: 1, title: 'Cook dinner', done: true
        }
      ]
    }
  }

  addNewTodo(){
    let todos = this.state.todos;
    todos.unshift({
      id: todos.length +1,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput:''
    })
  }

  toggleDone(item){
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if(todo.id === item.id){
        todo.done = !todo.done
      }

      return todo
    })

    this.setState({todos})
  }

  removeTodo (item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

    this.setState({todos});
  }

  render() {
    const statusbar = (Platform.OS == 'ios')? <View style = {styles.statusbar}></View> : <View></View>
    return (
      <View style={styles.container}>
        {statusbar}
        <Header title = 'To do app'/>
        <InputBar 
        textChange = {todoInput => this.setState({todoInput})}
        addNewTodo = {() => this.addNewTodo()}
        todoInput = {this.state.todoInput}
        />
        <FlatList 
          data = {this.state.todos}
          extraData = {this.state}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = { ({item, index}) => {
            return(
              <TodoItem todoItem = {item} toggleDone = {() => this.toggleDone(item)} removeTodo = {() => this.removeTodo(item)}/>
            )
          }
          }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    backgroundColor:'#FFCE00',
    height: 20
  }
});
