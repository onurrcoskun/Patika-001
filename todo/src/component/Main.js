import React, { useContext, useEffect, useCallback, useState } from "react";
import myContext from "../context/myContext";

function Main() {
  const { listItems, setListItems } = useContext(myContext);
  const [isActive, setIsActive] = useState(false);

  const checkFunc = (e) => {
    e.target.checked
      ? e.target.parentNode.parentNode.classList.add("completed")
      : e.target.parentNode.parentNode.classList.remove("completed");
  };

  const deleteFunc = useCallback(
    (e) => {
      let valueToDelete = e.target.previousElementSibling.textContent;

      setListItems((prev) => {
        let newlist = prev.filter((item) => {
          return item !== valueToDelete;
        });
        return [...newlist];
      });
    },
    [setListItems]
  );

  const labelChange = useCallback(
    (e) => {
      if (e.target.classList[0] === "passivetest") {
        e.target.classList.remove("passivetest");
        e.target.classList.add("activetest");
        e.target.parentNode.lastChild.classList.remove("hide");
      } else {
        e.target.classList.remove("activetest");
        e.target.classList.add("passivetest");
        e.target.parentNode.lastChild.classList.remove("hide");
      }
      e.target.nextElementSibling.nextElementSibling.focus();
    },
    [listItems, setListItems]
  );

  const editEnter = useCallback(
    (e) => {
      let valueToEdit =
        e.target.previousElementSibling.previousElementSibling.textContent;
      
        if (e.keyCode === 13) {
        setListItems((prev) => {
          let oldItemIndex = prev.indexOf(valueToEdit);
          if (oldItemIndex !== -1 && e.target.value !== "") {
            prev[oldItemIndex] = e.target.value;
          }
          e.target.classList.add("hide");
          return [...prev];
        });
      }
    },
    [setListItems]
  );







  const listem = listItems.map((item, index) => {
    return (
      <li key={index}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={checkFunc} />
          <label className="passivetest" onClick={labelChange}>
            {item}
          </label>
          <button className="destroy" onClick={deleteFunc}></button>
          <input
            className="yeniInput hide"
            type="text"
            onKeyDown={editEnter}
            autoFocus
          />
        </div>
      </li>
    );
  });

  useEffect(() => {
    listItems.map((item, index) => {
      return (
        <li key={index}>
          <div className="view">
            <input className="toggle" type="checkbox" onClick={checkFunc} />
            <label className="passivetest" onClick={labelChange}>
              {item}
            </label>
            <button className="destroy" onClick={deleteFunc}></button>
            <input
              className="yeniInput hide"
              type="text"
              onKeyDown={editEnter}
              autoFocus
            />
          </div>
        </li>
      );
    });
  }, [listItems, deleteFunc, labelChange]);

  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">{listem}</ul>
    </section>
  );
}

export default Main;