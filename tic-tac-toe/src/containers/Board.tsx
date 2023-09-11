import { useEffect, useState } from "react"
import Square from "../components/Square"
export type Player = 'X' | 'O' | 'BOTH' | null

function calculateWinner(squares: Player[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}


export default function Board() {
    const [squares, SetSquares] = useState(Array(9).fill(null)) //create an array with 9 elements
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random()) * 1 === 1 ? 'X' : 'O')
    const [winner, setWinner] = useState<Player>(null)

    function reset() {
        SetSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(Math.round(Math.random()) * 1 === 1 ? 'X' : 'O')
    }

    function setSquareValue(index: number) {
        const newDATA = squares.map((val, i) => {
            if (i === index) {
                return currentPlayer
            } else {
                return val;
            }
        });
        SetSquares(newDATA)

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
        // if the current player is X,then we set it to O the next move
    }

    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w)
        }

        if(!w && !squares.filter((square) => !square).length)
        {
            setWinner('BOTH')
        }
    }, [squares,winner])


    return (

        <div>
            <p>Hey {currentPlayer} its your turn</p>
            {winner && winner !== 'BOTH' && (<p>Congratulations {winner}</p>)}
            {winner && winner === 'BOTH' &&  (<p>Congratulations your both winners</p>)}

            <div className="grid">

                {Array(9).fill(null).map((_, i) => {
                    return <Square
                        winner={winner}
                        key={i}
                        onClick={() => setSquareValue(i)}
                        value={squares[i]}
                    />
                })}
            </div>
            <button className="reset" onClick={reset}>RESET</button>

        </div>)
}