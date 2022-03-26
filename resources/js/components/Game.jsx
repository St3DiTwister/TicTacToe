import React, {useEffect, useState} from 'react';

import './css/Game.css'
import Board from "./Board";
import {calculateWinner} from "../helper";
import {useLocation} from "react-router-dom";

const Game = () => {
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
        // Если это не создатель комнаты, то отправляется запрос о подключении к комнате
        if (isCreator === false) {
            axios.post('/connectToRoom');
            setXIsNext(true)
        }
    }, []);

    const channel = window.Echo.channel('tictactoe')
    channel.listen('MakeMoveEvent', ({board}) => {
        setBoard(board)
        setXIsNext(!xIsNext)
    });

    let isCreator = null
    if (location.state == null){
        isCreator = false
    } else {
        isCreator = location.state.isCreator
    }

    const handleClick = (index) => {
        const boardCopy = [...board]
        // Определить есть ли значение в ячейке или игра закончена.
        // Сложное условие, танцующее от создателя. Создатель ходит крестиками (X). Поэтому если X следующий, но пользователь не создатель, то ходить он не может.
        // И наоборот, X следующий, а пользователь создатель, то ходить он не может.
        if (winner || boardCopy[index] || xIsNext == null || (xIsNext === true && isCreator === false) || (xIsNext === false && isCreator === true)) {
            return null
        }
        // Определить чей ход.
        boardCopy[index] = xIsNext ? 'X' : 'O'
        setXIsNext(!xIsNext)

        // Отправить значение клеток другу.
        axios.post('/makeMove', {body: boardCopy})

        // Обновить значение клеток.
        setBoard(boardCopy)
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
