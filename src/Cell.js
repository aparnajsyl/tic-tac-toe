import React, {Component} from 'react';

export default class Table extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let cellValue =  this.props.playerNumber===0?'':this.props.playerNumber===1?'X':'O';
    let clickable = this.props.playerNumber===0?'Clickable':'';
    let clickCallback = this.props.playerNumber===0? ()=>this.props.selectCell(this.props.x, this.props.y)
                                                    :()=>{};
    return (
      <div className={`Cell ${clickable}`} onClick={clickCallback}>
        {cellValue}
      </div>
    );
  }

}

