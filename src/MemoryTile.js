import React, {Component} from 'react';
import './MemoryTile.css';

class MemoryTile extends Component{
    render(){
        const tiles = this.props.tiles.map((r) => {
            let style;
            if (r.currentState === 1||r.currentState === 2)
                style = {backgroundColor: r.color,animation: r.transition};

            return (<div key={r.id} style={style} onClick={r.currentState === 0? this.props.tileClick.bind(this,r):null} className="game-tiles" >
            </div>);
        });
        return[
            tiles
        ]
    }
}
export default MemoryTile;