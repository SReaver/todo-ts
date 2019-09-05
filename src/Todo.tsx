import React from 'react';
interface clk {
  dl: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dbl: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface ITodo {
  id: string;
  text: string;
  done: boolean;
}
interface IProps extends ITodo, clk {}

export const Todo = (props: IProps) => {
  return (
    <div
      key={props.id}
      style={{
        display: 'flex',
        width: '300px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <input type="checkbox" checked={props.done} disabled />
      <span
        id={props.id}
        onDoubleClick={(e: React.MouseEvent<HTMLButtonElement>) => props.dbl(e)}
      >
        {props.text}
      </span>
      <button
        id={props.id}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => props.dl(e)}
      >
        Delete
      </button>
    </div>
  );
};
