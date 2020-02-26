import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import checkWinner from './CheckWinner';
import { useEffect } from 'react';

let gameEnds;

function initState() {
    const BoardCircles = new Array(7 * 6).fill('white'); //creates the board
    return { color: 'teal', circles: BoardCircles, winner: null, newGame: false };
}

function reducer(state, action) {
    switch (action.type) {
        case 'drop_disc':
            if (state.winner) {
                return state;
            }

            const newCircles = [...state.circles];
            const column = action.index % 7; //creates columns
            let index = 5 * 7 + column; //"creates" the indexes

            while (index >= 0) {
                if (newCircles[index] === 'white') {
                    break;
                }
                index -= 7;
            }

            if (index < 0) { //when a column is filled 
                return state; //it should not be possible to drop into that column again
            }

            //console.log(index);
            newCircles[index] = state.color;

            const winner = checkWinner(newCircles);

            console.log("WINNER IS", winner);

            return {
                ...state,
                winner: winner,
                color: state.color === 'teal' ? 'gold' : 'teal',
                circles: newCircles,
            }
        case 'new_game':
            return initState();
        default:
            return state;
    }
}

export default function Board() {
    const [state, dispatch] = useReducer(reducer, null, initState);

    useEffect(() => {
        closePopup();
    });

    function closePopup() {
        gameEnds = null;
    }

    if (state.winner) {
        console.log(state.winner)
        gameEnds = (
            <div className="game-ends" style={{ position: "absolute" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                </div>
                <p>GAME OVER</p>
                <h3>The winner is {state.winner}!</h3>
                <button onClick={() => dispatch({ type: "new_game" })}>New Game</button>
            </div>
        )
    }

    return (
        <div>
            <h2>
                <span style={{color: "teal"}}>Connect</span>
                <span style={{color: "gold", fontWeight: "900", fontSize: "1.2em"}}>4</span>
            </h2>
            <Grid
                circles={state.circles}
                onClick={(i) => dispatch({ type: 'drop_disc', index: i })}
            />
            {ReactDOM.createPortal(gameEnds, document.body)}
        </div>
    )
}