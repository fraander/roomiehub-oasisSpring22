import "./App.css";
import Dashboard from "./Dashboard.js";
import LoginPage from "./LoginPage.js";

import { useState } from "react";

function App() {

  const [currentUser, setCurrentUser] = useState("")
  const [groupCode, setGroupCode] = useState("")

  const setCodes = (username, groupCode) => {
    setCurrentUser(username);
    setGroupCode(groupCode);

    const localStorageRoommateData = localStorage.getItem(`roommates_${groupCode}`) // get raw JSON data
    /**@type{Array} */
    const currentRoommates = (!!localStorageRoommateData ? JSON.parse(localStorageRoommateData) : []) // parse JSON data into array

    const hasCurrentUser = !!currentRoommates.find( ({name}) =>  name === username)

    if (!hasCurrentUser) {
      const name = username
      const id = currentRoommates.length;
      const newAccount = { id, name };

      const newAccounts = [...currentRoommates, newAccount]

      localStorage.setItem(`roommates_${groupCode}`, JSON.stringify(newAccounts))
    }
  }

  const onLogout = () => {
    setCurrentUser("");
  }

  if (currentUser === "") {
    return (<LoginPage onLogin={setCodes}/>);
  } else {
    return (<Dashboard onLogout={onLogout} currentUser={currentUser} groupCode={groupCode}/>);
  }
}

export default App;
