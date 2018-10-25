/*
 *  This project refers to the framework provided with the tic-tac-toe tutorial
 *  on the official site of React-app. The basic structure has lots of similarity
 *  with the tutorial code. However the implimentation of Reversi and the logic
 *  are all the work of ours. The realization of rollback is also a whole new 
 *  function, considering in Reversi, a single move changes other chess pieces, 
 *  which is different from tic-tac-toe, Go or Backgammon.
 *  
 *  Created by Ethan Zheng, Pascal Hao, 2018/04/25
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        var squares = new Array(10).fill(null).map(() => Array(10).fill(null));
        //initialization
        squares[4][4] = "X";
        squares[4][5] = "O";
        squares[5][4] = "O";
        squares[5][5] = "X";
        this.state = {
            previousSquares: squares,
            squares: squares,
            xIsNext: true,
            countX: 2,
            countO: 2,
            move: '',
            illegalAlert: false,
        };
    }

    handleClick(i, j) {
        var squares = this.state.squares;
        //generate a new array and give the original array to it to store
        var previousSquares = new Array(10).fill(null).map(() => Array(10).fill(null));
        for (var i2 = 0; i2 <= 9; i2++) {
            for (var j2 = 0; j2 <= 9; j2++) {
                if(squares[i2][j2] !== null){
                    var cache = squares[i2][j2] + "";
                    previousSquares[i2][j2] = cache + "";
                }
                else{
                    previousSquares[i2][j2] = null;
                }
            }
        }
        var i1 = i;
        var j1 = j;
        //see if they are next to each other
        if (squares[i][j] !== null) {
            return;
        }
        var isLegal = false;
        if (this.state.xIsNext) {
            //input X, check upper
            for (var k = i; k > 0; k--) {
                if (squares[k][j] === "X") {
                    var flipAll = true;
                    for (var l = k + 1; l < i; l++) {
                        if (squares[l][j] !== "O") {
                            flipAll = false;
                        }
                    }
                    if (k + 1 === i) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l <= i; l++) {
                            squares[l][j] = "X";
                        }
                    }
                }
            }
            //input X, check lower
            for (var k = i; k < 9; k++) {
                if (squares[k][j] === "X") {
                    var flipAll = true;
                    for (var l = k - 1; l > i; l--) {
                        if (squares[l][j] !== "O") {
                            flipAll = false;
                        }
                    }
                    if (k - 1 === i) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l >= i; l--) {
                            squares[l][j] = "X";
                        }
                    }
                }
            }
            //input X, check left
            for (var k = j; k > 0; k--) {
                if (squares[i][k] === "X") {
                    var flipAll = true;
                    for (var l = k + 1; l < j; l++) {
                        if (squares[i][l] !== "O") {
                            flipAll = false;
                        }
                    }
                    if (k + 1 === j) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l <= j; l++) {
                            squares[i][l] = "X";
                        }
                    }
                }
            }
            //input X, check right
            for (var k = j; k < 9; k++) {
                if (squares[i][k] === "X") {
                    var flipAll = true;
                    for (var l = k - 1; l > j; l--) {
                        if (squares[i][l] !== "O") {
                            flipAll = false;
                        }
                    }
                    if (k - 1 === j) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l >= j; l--) {
                            squares[i][l] = "X";
                        }
                    }
                }
            }
            //input X, check upper-left
            for (var k = 0; i - k > 0 && j - k > 0; k++) {
                if (squares[i - k][j - k] === "X") {
                    if (squares[i - 1][j - 1] === "O") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i - l][j - l] = "X";
                        }
                    }
                }
            }
            //input X, check lower-right
            for (var k = 0; i + k < 9 && j + k < 9; k++) {
                if (squares[i + k][j + k] === "X") {
                    if (squares[i + 1][j + 1] === "O") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i + l][j + l] = "X";
                        }
                    }
                }
            }
            //input X, check upper-right
            for (var k = 0; i - k > 0 && j + k < 9; k++) {
                if (squares[i - k][j + k] === "X") {
                    if (squares[i - 1][j + 1] === "O") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i - l][j + l] = "X";
                        }
                    }
                }
            }
            //input X, check lower-left
            for (var k = 0; i + k < 9 && j - k > 0; k++) {
                if (squares[i + k][j - k] === "X") {
                    if (squares[i + 1][j - 1] === "O") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i + l][j - l] = "X";
                        }
                    }
                }
            }
        }
        else {
            //input O, check upper
            for (var k = i; k > 0; k--) {
                if (squares[k][j] === "O") {
                    var flipAll = true;
                    for (var l = k + 1; l < i; l++) {
                        if (squares[l][j] !== "X") {
                            flipAll = false;
                        }
                    }
                    if (k + 1 === i) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l <= i; l++) {
                            squares[l][j] = "O";
                        }
                    }
                }
            }
            //input O, check lower
            for (var k = i; k < 9; k++) {
                if (squares[k][j] === "O") {
                    var flipAll = true;
                    for (var l = k - 1; l > i; l--) {
                        if (squares[l][j] !== "X") {
                            flipAll = false;
                        }
                    }
                    if (k - 1 === i) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l >= i; l--) {
                            squares[l][j] = "O";
                        }
                    }
                }
            }
            //input O, check left
            for (var k = j; k > 0; k--) {
                if (squares[i][k] === "O") {
                    var flipAll = true;
                    for (var l = k + 1; l < j; l++) {
                        if (squares[i][l] !== "X") {
                            flipAll = false;
                        }
                    }
                    if (k + 1 === j) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l <= j; l++) {
                            squares[i][l] = "O";
                        }
                    }
                }
            }
            //input O, check right
            for (var k = j; k < 9; k++) {
                if (squares[i][k] === "O") {
                    var flipAll = true;
                    for (var l = k - 1; l > j; l--) {
                        if (squares[i][l] !== "X") {
                            flipAll = false;
                        }
                    }
                    if (k - 1 === j) {
                        flipAll = false;
                    }
                    if (flipAll) {
                        isLegal = true;
                        for (var l = k; l >= j; l--) {
                            squares[i][l] = "O";
                        }
                    }
                }
            }
            //input O, check upper-left
            for (var k = 0; i - k > 0 && j - k > 0; k++) {
                if (squares[i - k][j - k] === "O") {
                    if (squares[i - 1][j - 1] === "X") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i - l][j - l] = "O";
                        }
                    }
                }
            }
            //input O, check lower-right
            for (var k = 0; i + k < 9 && j + k < 9; k++) {
                if (squares[i + k][j + k] === "O") {
                    if (squares[i + 1][j + 1] === "X") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i + l][j + l] = "O";
                        }
                    }
                }
            }
            //input O, check upper-right
            for (var k = 0; i - k > 0 && j + k < 9; k++) {
                if (squares[i - k][j + k] === "O") {
                    if (squares[i - 1][j + 1] === "X") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i - l][j + l] = "O";
                        }
                    }
                }
            }
            //input O, check lower-left
            for (var k = 0; i + k < 9 && j - k > 0; k++) {
                if (squares[i + k][j - k] === "O") {
                    if (squares[i + 1][j - 1] === "X") {
                        isLegal = true;
                        for (var l = k; l >= 0; l--) {
                            squares[i + l][j - l] = "O";
                        }
                    }
                }
            }
        }
        //jump out of the method if there's no legal move available for the spot
        if (!isLegal) {
            this.setState({ illegalAlert: true });
            this.playEffect(0);
            return;
        }
        this.playEffect(1);
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        //generate real time count
        var countX = 0, countO = 0;
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                if (squares[i][j] === 'X') {
                    countX++;
                }
                if (squares[i][j] === 'O') {
                    countO++;
                }
            }
        }
        //alert when the chessboard is filled and tell the winner
        if (countO + countX === 64) {
            if (countO > countX) {
                alert('O wins');
            }
            else if (countO === countX) {
                alert('Tie');
            }
            else {
                alert('X wins');
            }
        }
        //print message
        var move = (this.state.move) + '\n\rPlayer ' + (this.state.xIsNext ? 'X' : 'O') + ' makes a move at ' + '(' + i1 + ',' + j1 + ')';
        this.setState({
            previousSquares: previousSquares,
            squares: squares,
            xIsNext: !this.state.xIsNext,
            countX: countX,
            countO: countO,
            move: move,
            illegalAlert: false,
        });
    }

    //sound effect
    playEffect(i) {
        if (i === 0) {
            document.getElementById("illegalEffect").play();
        }
        if (i === 1) {
            document.getElementById("legalEffect").play();
        }
    }

    //rollback function which utilizes the instance variable previousSquares to rollback to the previous step
    rollback(){
        //only allowed once
        if(this.state.previousSquares === this.state.squares){
            return;
        }
        var rbSquares = this.state.previousSquares.slice();
        //generate new count
        var rbCountX = 0, rbCountO = 0;
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                if (rbSquares[i][j] === 'X') {
                    rbCountX++;
                }
                if (rbSquares[i][j] === 'O') {
                    rbCountO++;
                }
            }
        }
        //print message
        var move = (this.state.move) + "\n\rRollback";
        this.setState({
            previousSquares: rbSquares,
            squares: rbSquares,
            xIsNext: !this.state.xIsNext,
            countX: rbCountX,
            countO: rbCountO,
            move: move,
            illegalAlert: false,
        });
    }

    //generate a random place to make a move
    randomMove() {
        var irandom = 1 + Math.floor((Math.random() * 31)) % 7;
        var jrandom = 1 + Math.floor((Math.random() * 31)) % 7;
        this.handleClick(irandom, jrandom);
    }

    renderSquare(i, j) {
        return (
            <Square
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        const count = 'X:' + (this.state.countX) + ' O:' + (this.state.countO);
        const tracking = this.state.move;
        const illegalAlert = this.state.illegalAlert ? '! Illegal Move !' : '.';

        return (
            <div>
                <div className="status">
                    <button id="ng" onClick={() => window.location.reload()}>New Game</button>
                    <button id="cm" onClick={() => this.randomMove()}>Random Move</button>
                </div>
                <audio controls="controls">
                    <source src="http://play.onet4u.com/nazrenz.mp3" />
                </audio>
                <audio id="illegalEffect">
                    <source src="http://ec2-13-59-104-96.us-east-2.compute.amazonaws.com/~zhengyishan/CP/bounce.mp3" />
                </audio>
                <audio id="legalEffect">
                    <source src="http://ec2-13-59-104-96.us-east-2.compute.amazonaws.com/~zhengyishan/CP/move.mp3" />
                </audio>
                <div className="status">{status}</div>
                <div className="status">{count}</div>
                <div className="status" id="alert">{illegalAlert}</div>
                <div className="board-row">
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(1, 6)}
                    {this.renderSquare(1, 7)}
                    {this.renderSquare(1, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(2, 6)}
                    {this.renderSquare(2, 7)}
                    {this.renderSquare(2, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(3, 6)}
                    {this.renderSquare(3, 7)}
                    {this.renderSquare(3, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(4, 6)}
                    {this.renderSquare(4, 7)}
                    {this.renderSquare(4, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(5, 6)}
                    {this.renderSquare(5, 7)}
                    {this.renderSquare(5, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, 1)}
                    {this.renderSquare(6, 2)}
                    {this.renderSquare(6, 3)}
                    {this.renderSquare(6, 4)}
                    {this.renderSquare(6, 5)}
                    {this.renderSquare(6, 6)}
                    {this.renderSquare(6, 7)}
                    {this.renderSquare(6, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7, 1)}
                    {this.renderSquare(7, 2)}
                    {this.renderSquare(7, 3)}
                    {this.renderSquare(7, 4)}
                    {this.renderSquare(7, 5)}
                    {this.renderSquare(7, 6)}
                    {this.renderSquare(7, 7)}
                    {this.renderSquare(7, 8)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8, 1)}
                    {this.renderSquare(8, 2)}
                    {this.renderSquare(8, 3)}
                    {this.renderSquare(8, 4)}
                    {this.renderSquare(8, 5)}
                    {this.renderSquare(8, 6)}
                    {this.renderSquare(8, 7)}
                    {this.renderSquare(8, 8)}
                </div>
                <p>.</p>
                <div className="status">
                    <button id="rb" onClick={() => this.rollback()}>Rollback 1 Step</button>
                </div>
                <pre className="status" id="tracking">{tracking}</pre>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                </div>
                <div id="video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Ol3Id7xYsY4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
        );
    }
}

// ============================================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
