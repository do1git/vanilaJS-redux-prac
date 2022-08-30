import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD":
      return count + 1;
    case "MINUS":
      return count - 1;
    default:
      return count;
  }
};

const onChange = () => {
  console.log("there was a change occured");
};

const countStore = createStore(countModifier);

countStore.subscribe(onChange);

countStore.dispatch({ type: "ADD" });

console.log(countStore.getState());

const updateText = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(updateText);

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
  console.log("Add");
};
const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
  console.log("Minus");
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
