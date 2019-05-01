import React, {Component} from 'react';
import './NavBar.css';

class NavBar extends Component{
    render(){
        return(
            <nav>
                <li>Memory Game</li>
                <li><a onClick={this.props.onNewGame}>New Game</a></li>
            </nav>
        )
    }
}

export default NavBar;