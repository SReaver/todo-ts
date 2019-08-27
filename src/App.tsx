import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ITodo } from './Todo';
import axios from 'axios';
interface IState {
  text: string;
  done: boolean;
  todos: ITodo[];
}
interface IProps {}
class App extends Component<IProps, IState> {
  state: IState = {
    text: '',
    done: false,
    todos: []
  };
  onChangeHandler = (e: any) => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  };
  onCheckHandler = (e: any) => {
    this.setState({ done: e.target.checked });
    console.log(this.state.done);
  };
  submitHandler = (e: any) => {
    e.preventDefault();
    const data = { text: this.state.text, done: this.state.done };
    axios
      .post('https://todo-ts-58222.firebaseio.com/todos.json', data)
      .then(response => {
        console.log('response.data', response.data);
        // const arr=[];
        // arr.push({id:response.data.name, text: })
        // this.setState({todos: arr});
        console.log('this.state', this.state);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.submitHandler}>
            <input
              name="isDone"
              type="checkbox"
              checked={this.state.done}
              onChange={this.onCheckHandler}
            />
            <input
              name="todotext"
              value={this.state.text}
              onChange={this.onChangeHandler}
            />
            <button type="submit">Add</button>
          </form>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
