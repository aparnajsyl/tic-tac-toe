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
    this.setState(
      {selections : selections}, this.swapPlayer()
    );
  }

  selectCell(x,y){
    alert(this.shoudCheckDiagonal(x,y));
    let selections = this.state.selections;
    selections[x][y] = this.currentPlayer;
    this.gameHistory.push({player: this.currentPlayer, x:x, y:y});
    this.setState(
        {selections : selections}, this.swapPlayer()
    );   
  }

  swapPlayer(){
    this.currentPlayer = this.currentPlayer===1?2:1;
  }

  evaluate(x , y) {
    
  }

  shoudCheckDiagonal(x, y){
    return((x-y)%2 === 0 );
  }

  render() {
    return (
      <div className="App">
            <span><h2>Your turn - Player{this.currentPlayer}</h2></span>
            <button onClick={()=>{if(window.confirm("You are about to reset the game!"))this.reset();}}>Reset</button>
            &nbsp;{this.gameHistory.length > 0 ? <button onClick={()=>this.undo()}>Undo</button>:''}
            <br/><br/>
            <Table selections={this.state.selections} selectCell={this.selectCell}></Table>
      </div>
    );
  }

}

