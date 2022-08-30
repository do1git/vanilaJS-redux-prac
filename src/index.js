import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD";
const DELETE_TODO = "DELETE";

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};
const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      console.log("try to del", action.id);
      return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};
const dispatchDeleteToDo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((todo) => {
    const newTodo = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteToDo);
    btn.innerText = "DEL";
    newTodo.id = todo.id;
    newTodo.innerText = todo.text;
    newTodo.appendChild(btn);
    ul.appendChild(newTodo);
  });
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
