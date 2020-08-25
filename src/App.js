import React from "react";
import logo from "./logo.svg";
import "./App.less";

import { Button } from "antd";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type="primary">Learn React</Button>
      </header>
    </div>
  );
}

export default App;
