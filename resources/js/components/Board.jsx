import React from 'react';

import './css/Board.css'
import Square from "./Square";

const Board = ({squares, click}) => {
    return (
        <div className="board">
            {
                squares.map((square, i) => (
                    <Square onClick={() => click(i)} key={i} value={square} />
                ))
            }
        </div>
    );
};

export default Board;
