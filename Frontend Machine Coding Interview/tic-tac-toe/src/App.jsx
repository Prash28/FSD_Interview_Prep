import { useState } from 'react'
import './App.css'

const initialBoard = () => Array(9).fill(null)

function App() {
  const [board, setBoard] = useState(initialBoard())
  console.log(board);
  
  return (
    <div className="game">
      <div className="status">
        Player X Turn
        <button>Reset button</button>
      </div>
      <div className="board">
        {/* render our board */}
        {board.map((_,index) => {
          return <button className="cell" key={index}>X</button>
        })}
      </div>
    </div>
  )
}

export default App
