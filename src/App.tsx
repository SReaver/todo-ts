import React from 'react';
import './App.css';
import { ITodo } from './Todo';
import axios, { AxiosResponse } from 'axios';
import { Todo } from './Todo';

interface IState {
  id: string
  text: string;
  done: boolean;
  todos: ITodo[];
}
interface IProps { };
class App extends React.Component<IProps, IState> {
  state: IState = {
    id: '',
    text: '',
    done: false,
    todos: []
  };
  componentDidMount() {
    console.log('mount')
  }
  // componentDidMount() {
  //   console.log('mount');
  // axios
  //   .get('https://todo-ts-58222.firebaseio.com/todos.json')
  //   .then((response: AxiosResponse) => {
  //     console.log(response.data);
  //     this.setState({todos: [...Response.data]})
  //   })
  // }
  onChangeHandler = (e: any) => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  };
  onCheckHandler = (e: any) => {
    this.setState({ done: e.target.checked });
    console.log(this.state.done);
  };
  dl = () => {

  }
  submitHandler = (e: any) => {
    e.preventDefault();
    const data = { text: this.state.text, done: this.state.done };
    axios
      .post('https://todo-ts-58222.firebaseio.com/todos.json', data)
      .then((response: AxiosResponse) => {
        console.log('response.data', response.data);
        const arr = [];
        arr.push({ id: response.data.name, text: this.state.text, done: this.state.done })
        this.setState({ todos: [...this.state.todos, ...arr] });
        console.log('this.state', this.state);
      })
      .catch(error => {
        console.log(error);
      });
  };
  public render() {
    let todos = null;
    if (this.state.todos.length) {
      todos = this.state.todos.map(todo => {
        return <Todo key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          dl={this.dl}
        />
      })
    }
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
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
          {todos}
        </header>
      </div>
    );
  }
}

export default App;
