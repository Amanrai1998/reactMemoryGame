import React, {Component} from 'react';
import MemoryTile from './MemoryTile';
import './GameBody.css';

class GameBody extends Component{
    render(){
        return(
            <div className="game-body">
                <MemoryTile tiles={this.props.tiles} tileClick={this.props.tileClick}/>
            </div>
        )
    }
}

export default GameBody;