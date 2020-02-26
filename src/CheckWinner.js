const checkWinner = (board) => {

    /*--------------------------------- in rows -----------------------------*/
    for (let x = 0; x <= 35; x += 7) {
        for (let y = x; y <= x + 3; y++) {
            if (board[y] !== 'white') {
                if (
                    board[y] === board[y + 1] &&
                    board[y] === board[y + 2] &&
                    board[y] === board[y + 3]
                ) {
                    return board[y];
                }
            }
        }
    }
    
    /*--------------------------------- in columns -----------------------------*/
    for (let x = 0; x <= 6; x++) {
        for (let y = x; y <= x + 14; y += 7) {
            if (board[y] !== 'white') {
                if (
                    board[y] === board[y + 7] &&
                    board[y] === board[y + 14] &&
                    board[y] === board[y + 21]
                ) {
                    return board[y];
                }
            }
        }
    }
    /*--------------------- diagonals from the top left corner -----------------------*/
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            let index = x * 7 + y;
            if (board[index] !== 'white') {
                if (
                    board[index] === board[index + 8] &&
                    board[index] === board[index + 16] &&
                    board[index] === board[index + 24]
                ) {
                    console.log('How won?');
                    return board[index];
                }
            }
        }
    }
    
    /*------------------------ diagonals from the top right corner -----------------------*/
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            let index = x * 7 + y + 21;
            if (board[index] !== 'white') {
                if (
                    board[index] === board[index - 6] &&
                    board[index] === board[index - 12] &&
                    board[index] === board[index - 18]
                ) {
                    console.log('How won?');
                    return board[index];
                }
            }
        }
    }

    /*----------------------check if it is draw --------------------------*/
    
    if (!board.includes('white')) {
            console.log("draw");
            return "... NOONE";
    }
    

    return null;
}

export default checkWinner;