import * as Redux from "redux";

// action types
const ADD_TODO = Symbol("ADD_TODO");
const DELETE_TODO = Symbol("DELETE_TODO");

// action creators
function addTodo(id, task) {
  return {
    type: ADD_TODO,
    payload: { id, task, isDone: false }
  };
}

function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: { id }
  };
}

function reducer(state, action) {
  if (state == null) {
    return {
      todos: []
    };
  }

  if (action.type === ADD_TODO) {
    let todo = action.payload;

    return {
      todos: [...state.todos, todo]
    };
  }

  if (action.type === DELETE_TODO) {
    let { id } = action.payload;

    return {
      todos: state.todos.filter(todo => todo.id !== id)
    }
  }
}

let store = Redux.createStore(reducer);

console.log(store);

store.subscribe(() => console.log(store.getState()));

store.dispatch(addTodo(1, "Feed the dog"));
store.dispatch(addTodo(2, "Buy milk"));

store.dispatch(deleteTodo(1));

