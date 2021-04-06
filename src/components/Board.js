import "./Board.css";
import logo_blue from "../assets/logo_blue.svg";
import logo_red from "../assets/logo_red.svg";
import Square from "./Square";
import { useEffect, useState } from "react";
import usePrevious from "../hooks/usePrevious";
import { useSelector } from "react-redux";
import { selectMode } from "../slices/PvPModeSlice";

export default function Board() {
    const activePvP = useSelector(selectMode);
    const prevActivePvP = usePrevious(activePvP);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const prevXIsNext = usePrevious(xIsNext);

    useEffect(() => {
        if (prevActivePvP !== activePvP) {
            startAgain();
            return;
        }
        if (prevActivePvP || calculateWinner()) {
            return;
        }
        const isStart = squares.filter(s => s == null).length === squares.length;
        if (prevXIsNext && !isStart) {
            machinePlay();
        }
    });

    function handleClick(i) {
        const _squares = squares.slice();
        if (calculateWinner() || _squares[i]) {
            return;
        }
        _squares[i] = xIsNext ? logo_blue : logo_red;
        setSquares(_squares);
        setXIsNext(!xIsNext);
    }

    function machinePlay() {
        const _squares = squares.slice();
        const availableSquares = [];
        for (let j = 0; j < _squares.length; j++) {
            if (_squares[j] == null) {
                availableSquares.push(j);
            }
        }
        const random = Math.floor(Math.random() * availableSquares.length);
        _squares[availableSquares[random]] = logo_red;
        setSquares(_squares);
        setXIsNext(!xIsNext);
    }

    function startAgain() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    function calculateWinner() {
        const _squares = squares.slice();
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (_squares[a] && _squares[a] === _squares[b] && _squares[a] === _squares[c]) {
                return _squares[a];
            }
        }
        return null;
    }

    function renderSquare(i) {
        return <Square value={squares[i]}
                       onClick={() => handleClick(i)} />;
    }

    const winner = calculateWinner();
    const isTie = !winner && squares.filter(s => s == null).length === 0;
    let statusSrc;
    let statusText;
    if (winner) {
        statusText = 'Winner:';
        statusSrc = winner;
    } else if (isTie) {
        statusText = 'Its a tie!';
        statusSrc = null;
    } else {
        statusText = 'Next player:'
        statusSrc = xIsNext ? logo_blue : logo_red
    }

    return (
        <div>
            <div className="status">
                {statusText}
                {statusSrc && <img src={statusSrc} className="App-logo" alt="logo" />}
            </div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div className="start-again-button-holder">
                {(winner || isTie) &&
                <button className="start-again-button"
                        onClick={() => startAgain()}>
                    Start again
                </button>}
            </div>
        </div>
    );
}
