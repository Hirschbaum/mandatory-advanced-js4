import React from 'react';

const Grid = (props) => {
    let circles = props.circles;
    const drop = circles.map((circle, index) => {
        return (
            <div
                className='grid-circle'
                key={index}
                style={{backgroundColor: circle}}
                onClick={() => props.onClick(index)}
            >
            </div>
        )
    })
    
    return (
        <div className='grid-container'>
            {drop}
        </div>
    )
}

export default Grid;