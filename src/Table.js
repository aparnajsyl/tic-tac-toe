import React, {Component} from 'react';
import Cell from './Cell';
import './Table.css';

export default class Table extends Component {  
  render() {
    return (
      <div className="Table">
       <table>
        <tbody>
           {this.createTable()}
        </tbody>
       </table>
      </div>
    );
  }

  createTable() {
     let table = []
     for (let x = 0; x < 3; x++) {
        let cells = []
        for (let y = 0; y < 3; y++) {
          let key = x+'-'+y;
          cells.push(<td key={key}><Cell x={x} y={y} selectCell={this.props.selectCell} playerNumber={this.props.selections[x][y]} key={key}></Cell></td>)
        }
        table.push(<tr key={x}>{cells}</tr>)
      }
      return table
    }
}

