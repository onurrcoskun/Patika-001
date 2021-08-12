import React, { useState, useContext } from "react";
import myContext from "../context/myContext";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const { setListItems } = useContext(myContext);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setListItems((prev)=>[...prev, inputValue]);
    setInputValue("");
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={inputValue}
          onChange={onChange}
        />
      </form>
    </header>
  );
}

export default Header;