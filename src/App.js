import logo_blue from './assets/logo_blue.svg';
import logo_red from './assets/logo_red.svg';
import user_blue from './assets/user_blue.svg'
import user_red from './assets/user_red.svg'
import computer from './assets/computer.svg'
import './App.css';
import * as React from "react";

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = { PvPMode : true };
  }

  updatePvPMode = (PvPMode) => {
    this.setState({ PvPMode })
  }

  render() {
    return (
      <div className="App">
        <div className="game-board">
          <Board activePvP={this.state.PvPMode}/>
        </div>
        <div className="game-mode">
          <Selector activePvP={this.state.PvPMode}
                    updateMode={this.updatePvPMode}/>
        </div>
      </div>
    );
  }
}

export default App;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value && <img src={props.value} className="App-logo" alt="logo" />}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePvP !== this.props.activePvP) {
      this.startAgain();
      return;
    }
    if (this.props.activePvP || this.calculateWinner()) {
      return;
    }
    const isStart = this.state.squares.filter(s => s == null).length === this.state.squares.length;
    if (prevState.xIsNext && !isStart) {
      this.machinePlay();
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner() || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? logo_blue : logo_red;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  machinePlay() {
    const squares = this.state.squares.slice();
    const availableSquares = [];
    for (let j = 0; j < squares.length; j++) {
      if (squares[j] == null) {
        availableSquares.push(j);
      }
    }
    const random = Math.floor(Math.random() * availableSquares.length);
    squares[availableSquares[random]] = logo_red;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  startAgain() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }

  calculateWinner() {
    const squares = this.state.squares.slice();
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]}
                   onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = this.calculateWinner();
    const isTie = !winner && this.state.squares.filter(s => s == null).length === 0;
    let statusSrc;
    let statusText;
    if (winner) {
      statusText = 'Winner:';
      statusSrc = winner;
    } else if (isTie) {
      statusText = 'Its a tie!';
      statusSrc = null;
    } else {
      statusText = 'Next player:'
      statusSrc = this.state.xIsNext ? logo_blue : logo_red
    }

    return (
      <div>
        <div className="status">
          {statusText}
          {statusSrc && <img src={statusSrc} className="App-logo" alt="logo" />}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="button-holder">
          {(winner || isTie) &&
          <button onClick={() => this.startAgain()}>Start again</button>}
        </div>
      </div>
    );
  }
}

function Selector(props) {
  return (
    <div className="button-holder">
      <button className={props.activePvP ? "active" : ""}
              onClick={() => props.updateMode(true)}>
        <img src={user_blue} className="player" alt="player blue" />
        <img src={user_red} className="player" alt="player red" /><br />
        <span>Player vs. Player</span>
      </button>
      <button className={props.activePvP ? "" : "active"}
              onClick={() => props.updateMode(false)}>
        <img src={user_blue} className="player" alt="player blue" />
        <img src={computer} className="player" alt="computer red" /><br />
        <span>Player vs. Machine</span>
      </button>
    </div>
  );
}
