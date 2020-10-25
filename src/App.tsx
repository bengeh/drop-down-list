import React from 'react';
import Search from './component/Search'
import './App.css';
import { useState } from "react";


function App() {
  const [adminRights, setAdminRights] = useState(false);
  function toggleAdmin() {
    setAdminRights(!adminRights)
  }
  return (
    <div className="App">
      <button onClick={() => toggleAdmin()}>Click to be admin</button>
      <Search adminRights={adminRights} countries={["america", "singapore", "bangkok", "india", "japan", "indoneasia", "iceland", "iraq", "iran", "italy"]}/>
    </div>
  );
}

export default App;
