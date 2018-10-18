import * as React from "react";
import "./App.css";
import TicTacToeTee from "./game/TicTacToeTee";

import logo from "./logo.svg";

class App extends React.Component {
  public render() {
    return (
      <div>
        <TicTacToeTee />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
