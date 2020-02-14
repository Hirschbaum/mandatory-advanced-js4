import React, { useReducer } from 'react';
import Grid from './Grid';

const BoardCircles = new Array(7 * 6).fill('white'); //creates the board
console.log(BoardCircles);

export default function Board(){
    const [state, dispatch] = useReducer(reducer, { color: 'red', circles: BoardCircles});

    function reducer(state, action) {
        switch (action.type) {
            case 'drop_disc':
                const newCircles = [...state.circles];
                newCircles[action.index] = state.color;
                return {
                    ...state,
                    circles: newCircles,
                }
            default:
                return state;
        }
    }

    return(
        <div>
            <h3>ConnectFour</h3>
            <Grid 
                circles={state.circles}
                onClick={(i) => dispatch({type: 'drop_disc', index: i})}
            />

        </div>
    )
}