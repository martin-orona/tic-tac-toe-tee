import * as React from "react";
import "./App.css";
import Game from "./game/Game";

// import logo from "./logo.svg";

import Avatar2 from "./game/images/avatar01.png";
import Avatar1 from "./game/images/avatar02.png";

class App extends React.Component {
  public state = { response: "no request made yet" };

  public componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err);
      });
  }

  public render() {
    return (
      <div>
        <Game
          player1={{ name: "Jen", avatarUrl: Avatar1 }}
          player2={{ name: "Ben", avatarUrl: Avatar2 }}
        />

        <div>server response: {this.state.response}</div>
        {/* <br />
        <br />
        <hr />
        <br />
        <br /> */}
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div> */}
      </div>
    );
  }

  private callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };
}

export default App;
