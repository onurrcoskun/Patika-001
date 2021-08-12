import React, { useContext } from "react";
import myContext from "../context/myContext";

function Footer() {

  const { listItems, setListItems } = useContext(myContext);


  const activeFunc = () => {
    let myboy = document.getElementsByClassName("toggle");
    for (let i = 0; i < myboy.length; i++) {
      myboy[i].parentNode.parentNode.classList.remove("hide");
      if (myboy[i].checked) {
        myboy[i].parentNode.parentNode.classList.add("hide");
      }
    }
  };


  const allFunc = () => {
    let myboy = document.getElementsByClassName("toggle");
    for (let i = 0; i < myboy.length; i++) {
      myboy[i].parentNode.parentNode.classList.remove("hide");
      if (myboy[i].checked) {
        myboy[i].parentNode.parentNode.classList.remove("hide");
      }
    }
  };


  const compFunc = () => {
    let myboy = document.getElementsByClassName("toggle");
    for (let i = 0; i < myboy.length; i++) {
      myboy[i].parentNode.parentNode.classList.remove("hide");
      if (!myboy[i].checked) {
        myboy[i].parentNode.parentNode.classList.add("hide");
      }
    }
  };

  const clearFunc = () => {
    const myItems = document.getElementsByClassName("toggle");
    let myArr = [];

    for (let i = 0; i < myItems.length; i++) {
      if (myItems[i].checked) {
        myArr.push(myItems[i].nextElementSibling.textContent);
      }
    }
    console.log(myArr);

    setListItems((prev) => {
      let newlist = prev.filter((item) => {
        return !myArr.includes(item);
      });
      return [...newlist];
    });

	//son kalan item checked olarak üstü çizili oluyordu. onu engelledim
    let myremain = document.getElementsByClassName("toggle");
    myremain[0].checked = false;
    myremain[0].parentNode.parentNode.classList.remove("completed");
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{listItems.length} </strong>
        items left
      </span>

      <ul className="filters">
        <li>
          <button onClick={allFunc}>All</button>
        </li>
        <li>
          <button onClick={activeFunc}>Active</button>
        </li>
        <li>
          <button onClick={compFunc}>Completed</button>
        </li>
      </ul>

      <button className="clear-completed" onClick={clearFunc}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;