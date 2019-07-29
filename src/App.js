import React, {Component} from 'react';
import './App.css';
import Table from './Table';

export default class App extends Component {
  constructor(props){
    super(props);
    this.currentPlayer = 1;
    this.state = {
      selections : [[0,0,0],[0,0,0],[0,0,0]]
    }
    this.selectCell = this.selectCell.bind(this);
    this.reset = this.reset.bind(this);
    this.undo = this.undo.bind(this);
    this.gameHistory = [];
  }

  reset() {
    this.currentPlayer = 1;
    this.gameHistory = [];
    this.setState({
      selections : [[0,0,0],[0,0,0],[0,0,0]]
    });
  }

  undo() {
    let lastAction = this.gameHistory.pop();
    let selections = this.state.selections;
    selections[lastAction.x][lastAction.y] = 0;
    this.swapPlayer();
    let playerWon = this.evaluate(selections)?this.currentPlayer:-1;
    let gameOver = this.gameHistory.length === 9;
    if(gameOver && playerWon <0){
      playerWon=0;
    }
    this.setState(
      {selections : selections, playerWon: playerWon}
    );
  }

  selectCell(x,y){
    let selections = this.state.selections;
    selections[x][y] = this.currentPlayer;
    this.gameHistory.push({player: this.currentPlayer, x:x, y:y});
    let playerWon = this.evaluate(selections)?this.currentPlayer:-1;
    let gameOver = this.gameHistory.length === 9;
    if(gameOver && playerWon <0){
      playerWon=0;
    }
    this.swapPlayer();
    this.setState(
        {selections : selections, playerWon: playerWon}
    );   
  }

  swapPlayer(){
    this.currentPlayer = this.currentPlayer===1?2:1;
  }

  evaluate(selections) {
    for(let i =0; i< 3; i++){
      if((selections[i][0] === selections[i][1]) && (selections[i][0] === selections[i][2])){
        if(selections[i][0] !== 0)
          return true;
        
      }
      if((selections[0][i] === selections[1][i]) && (selections[0][i] === selections[2][i])){
        if(selections[0][i] !== 0)
          return true;
      }
    }
    if((selections[0][0] === selections[1][1]) && (selections[0][0] === selections[2][2])){
      if(selections[0][0] !== 0)
        return true;
    }
    if((selections[0][2] === selections[1][1]) && (selections[0][2] === selections[2][0])){
      if(selections[0][2] !== 0)
        return true;
    }
  }

  render() {
    let message = `Your turn - Player${this.currentPlayer}`;
    if(this.state.playerWon === 0 ){
      message = "The game is Tied";
    }

    if(this.state.playerWon > 0 ){
      message = `GAME WON BY - Player${this.state.playerWon}`
    }
    
    return (
      <div className="App">
            <span><h2>{message}</h2></span>
            <button onClick={()=>{if(window.confirm("You are about to reset the game!"))this.reset();}}>Reset</button>
            &nbsp;{this.gameHistory.length > 0 ? <button onClick={()=>this.undo()}>Undo</button>:''}
            <br/><br/>
            <Table selections={this.state.selections} selectCell={this.selectCell}></Table>
      </div>
    );
  }

}

