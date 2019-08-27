import React from 'react';
interface dl {
  dl: () => void;
}
export interface ITodo {
  id: string;
  text: string;
  done: boolean;
}
interface IProps extends ITodo, dl { }

export const Todo = (props: IProps) => {
  return (
    <div key={props.id} style={{ display: 'flex', width: '300px', justifyContent: 'space-between', alignItems: 'center' }}>
      <input type="checkbox" checked={props.done} disabled />
      <span>{props.text}</span>
      <button onClick={props.dl}>Delete</button>
    </div>
  );
};
