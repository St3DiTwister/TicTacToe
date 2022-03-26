import React, {useEffect, useRef, useState} from 'react';

import './css/Game.css'
import Board from "./Board";
import {calculateWinner} from "../helper";
import {useLocation} from "react-router-dom";

const Game = (props) => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(null)
    const winner = calculateWinner(board)
    const location = useLocation()

    useEffect(() => {
        const channel = window.Echo.channel('tictactoe')
        channel.listen('ConnectionEvent', ({}) => {
            setXIsNext(true)
            console.log('Успех')
        });
    }, []);


    let state = null
    if (location.state == null){
        state = false
    } else {
        state = location.state.isCreator
    }


    // Если это не создатель комнаты, то отправляется запрос о подключении к комнате
    if (state === false) {
        axios.post('/connect');
    }

    const handleClick = (index) => {
        const boardCopy = [...board]
        // Определить есть ли значение в ячейке или игра закончена.
        if (winner || boardCopy[index] || xIsNext == null) {
            return null
        }
        // Определить чей ход.
        boardCopy[index] = xIsNext ? 'X' : 'O'

        // Обновить state.
        setBoard(boardCopy)
        setXIsNext(!xIsNext)
    }

    const startNewGame = () => {
        return (
            <button className="start__btn" onClick={() => setBoard(Array(9).fill(null))}>Очистить поле</button>
        )
    }

    return (
        <div className="wrapper">
            { startNewGame() }
            <Board squares={board} click={handleClick}/>
            <p className="game__info">
                {winner === 'draw' ? 'Ничья!' : (xIsNext == null ? 'Ждем подключения друга' : (winner ? 'Победитель ' + winner : 'Сейчас ходит ' + (xIsNext ? 'X' : 'O')))}
            </p>
        </div>
    );
};

export default Game;
