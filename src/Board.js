import React, { useReducer } from 'react';
import Grid from './Grid';

const BoardCircles = new Array(7 * 6).fill('white'); //creates the board
//console.log(BoardCircles);

export default function Board(){
    const [state, dispatch] = useReducer(reducer, { color: 'teal', circles: BoardCircles });

    function reducer(state, action) {
        switch (action.type) {
            case 'drop_disc':
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

                console.log(index);
                newCircles[index] = state.color;
                
                return {
                    ...state,
                    color: state.color === 'teal' ? 'gold' : 'teal',
                    circles: newCircles,
                }
            default:
                return state;
        }
    }

    //if click on: index || index + 7 || index + 14 || index + 21 ... 
    //=> drop in that column on the bottom

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