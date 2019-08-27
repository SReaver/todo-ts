import React from 'react';
export interface ITodo {
  id: string;
  text: string;
  done: boolean;
  delete: () => void;
}
export const todo = (props: ITodo) => {
  return (
    <div key={props.id}>
      <input type="checkbox" checked={props.done} />
      <span>{props.text}</span>
      <button onClick={props.delete}>Delete</button>
    </div>
  );
};
