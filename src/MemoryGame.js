import React, {Component} from 'react';
import NavBar from './NavBar';
import shuffle from 'shuffle-array'
import './MemoryGame.css';
import GameBody from "./GameBody";

const tileStates = {
            hiding: 0,
            showing: 1,
            matching: 2
        };

class MemoryGame extends Component{
    constructor(props) {
        super(props);
        const tiles = [
            {id: 1, currentState: tileStates.hiding, color: "red",transition: undefined},
            {id: 2, currentState: tileStates.hiding, color: "red",transition: undefined},
            {id: 3, currentState: tileStates.hiding, color: "yellow",transition: undefined},
            {id: 4, currentState: tileStates.hiding, color: "yellow",transition: undefined},
            {id: 5, currentState: tileStates.hiding, color: "blue",transition: undefined},
            {id: 6, currentState: tileStates.hiding, color: "blue",transition: undefined},
            {id: 7, currentState: tileStates.hiding, color: "green",transition: undefined},
            {id: 8, currentState: tileStates.hiding, color: "green",transition: undefined},
            {id: 9, currentState: tileStates.hiding, color: "orange",transition: undefined},
            {id: 10, currentState: tileStates.hiding, color: "orange",transition: undefined},
            {id: 11, currentState: tileStates.hiding, color: "pink",transition: undefined},
            {id: 12, currentState: tileStates.hiding, color: "pink",transition: undefined},
            {id: 13, currentState: tileStates.hiding, color: "white",transition: undefined},
            {id: 14, currentState: tileStates.hiding, color: "white",transition: undefined}
        ];
        this.state = {
            tiles: shuffle(tiles)
        };
        this.tileClick = this.tileClick.bind(this);
        this.newGameLink = this.newGameLink.bind(this);
    }
    tileClick(r){
        const mapCardState = (tiles, idsToChange, newState,animation) =>{
            return tiles.map(s=>{
                if(idsToChange.includes(s.id))
                    return{
                        ...s,
                        currentState: newState,
                        transition: animation
                    };
                return s;
            });
        };
        let tiles = mapCardState(this.state.tiles, [r.id], tileStates.showing,undefined);
        const showingTiles = tiles.filter(s=> s.currentState === tileStates.showing);
        const ids = showingTiles.map(c=> c.id);

        if(showingTiles.length === 2){
            if(showingTiles[0].color === showingTiles[1].color)
                tiles = mapCardState(tiles, ids, tileStates.matching,"enlarge 0.5s linear");
            else{
                tiles = mapCardState(tiles, ids, tileStates.showing,"shake 0.3s linear");
                let hidingTiles = mapCardState(tiles, ids, tileStates.hiding,undefined);
                this.setState({tiles}, ()=>{
                    setTimeout(()=>{
                        this.setState({tiles: hidingTiles});
                    },300);
                });
                return;
            }
        }
        this.setState({tiles});
    }
    newGameLink() {
        let tiles = this.state.tiles.map((s) => {
            s.currentState = tileStates.hiding;
            s.transition = undefined;
            return s;
        });
        tiles = shuffle(tiles);
        this.setState({tiles});
    }

    render(){
        return[
            <NavBar key='nav' onNewGame={this.newGameLink}/>,
            <GameBody tiles={this.state.tiles} tileClick={this.tileClick} key='body'/>
        ]
    }
}

export default MemoryGame;