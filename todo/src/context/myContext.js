import { createContext, useState } from "react";

const myContext = createContext();

export const MyProvider = ({children}) => {
    const [listItems, setListItems] = useState(["Learn English", "Learn React"]);

    const values = {
        listItems,
        setListItems
    }
    return <myContext.Provider value={values}>{children}</myContext.Provider>
}

export default myContext;
