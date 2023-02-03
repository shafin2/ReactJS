import React from 'react';
import ReactDOM from 'react-dom/client';
import './TicTac.css';

// class Square extends React.Component {
//   // constructor(props){
//   //   super(props);
//   //   this.state={
//   //     value:null,
//   //   };
//   // }
//   render() {
//     return (
//       <button className="square" onClick={ ()=>{this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }    
function Square(props){
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     squares:Array(9).fill(null),
  //     turn:'X',
  //   };

  // }
  // handleClick(i){
  //   const mysquares=this.state.squares.slice();
  //   if (calculateWinner(mysquares) || mysquares[i]) {
  //     if(calculateWinner(mysquares)){
  //       alert("Game finished\n"+ calculateWinner(mysquares)+" is winner");
  //     }
  //     else{
  //       alert("Choose another one");
  //     }
  //     return;
  //   }
  //   mysquares[i]=this.state.turn=='X'?'X':'O';
  //   this.setState(
  //     {
  //       squares:mysquares,
  //       turn:this.state.turn=='X'?'O':'X',
  //   });
  // }
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
  }

  render() {
    // let winner=calculateWinner(this.state.squares);
    // const status = winner?('Winner: ' + winner):('Next player: '+this.state.turn);
    return (
      <div>
        <div className="status">{this.props.status}</div>
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
      </div>
    );
  }
  
  
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      turn:'X',
      stepNumber:0,
    };
  }
  handleClick(i){
    const mysquares=this.state.history.slice(0, this.state.stepNumber + 1)[this.state.history.length-1].squares.slice();
    if (calculateWinner(mysquares) || mysquares[i]) {
      if(calculateWinner(mysquares)){
        alert("Game finished\n"+ calculateWinner(mysquares)+" is winner");
      }
      else{
        alert("Choose another one");
      }
      return;
    }
    mysquares[i]=this.state.turn==='X'?'X':'O';
    this.setState(
      {
        history:this.state.history.concat([{
          squares:mysquares,
        }]),
        turn:this.state.turn=='X'?'O':'X',
        stepNumber:this.state.history.slice(0, this.state.stepNumber + 1).length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    let winner=calculateWinner(this.state.history[this.state.stepNumber].squares);
    const status = winner?('Winner: ' + winner):('Next player: '+this.state.turn);
    const moves = this.state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.history[this.state.stepNumber].squares} status={status} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);
export default Game;
function calculateWinner(squares) {
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