import React from 'react';
import './App.css';
import { ITodo } from './Todo';
import axios, { AxiosResponse } from 'axios';
import { Todo } from './Todo';

interface IState {
  id: string;
  text: string;
  done: boolean;
  todos: ITodo[];
}
interface IProps {}
class App extends React.Component<IProps, IState> {
  state: IState = {
    id: '',
    text: '',
    done: false,
    todos: []
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .get('https://todo-ts-58222.firebaseio.com/todos.json')
      .then((response: AxiosResponse) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ todos: [...fetchedOrders] });
      });
  };
  deleteFromServer = (e: any) => {
    axios
      .delete(`https://todo-ts-58222.firebaseio.com/todos/${e.target.id}.json`)
      .then(response => {})
      .then(() => {
        this.getData();
      })
      .catch(err => console.log(err));
  };
  delHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.deleteFromServer(e);
  };

  onChangeHandler = (e: any) => {
    e.preventDefault();
    this.setState({ text: e.target.value });
  };
  onCheckHandler = (e: any) => {
    this.setState({ done: e.target.checked });
  };
  submitHandler = (e: any) => {
    e.preventDefault();
    const data = { text: this.state.text, done: this.state.done };
    axios
      .post('https://todo-ts-58222.firebaseio.com/todos.json', data)
      .then((response: AxiosResponse) => {
        const arr = [];
        arr.push({
          id: response.data.name,
          text: this.state.text,
          done: this.state.done
        });
        this.setState({ todos: [...this.state.todos, ...arr], text: '' });
      })
      .catch(err => console.log(err));
  };
  public render() {
    let todos = null;
    if (this.state.todos.length) {
      todos = this.state.todos.map(todo => {
        return (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
            dl={(e: React.MouseEvent<HTMLButtonElement>) => this.delHandler(e)}
          />
        );
      });
    }
    return (
      <div className="App">
        <header className="App-header">
          <form
            onSubmit={this.submitHandler}
            style={{ display: 'flex', alignItems: 'center' }}
          >
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
