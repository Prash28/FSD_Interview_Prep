import './App.css';
import {useState} from 'react';

function Cell({filled, onClick, isDisabled, label}){
  return <button type="button"
  onClick={onClick} className={filled? "cell-activated": "cell"} disabled={isDisabled} aria-label={label}
  />
}

function App() {

  const [order,setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
//config is used for scalability. To make it easier to add or remove any of the squares by simply modifying the config values.
  const config = [
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ]

  const deactivateCells = () => {
    setIsDeactivating(true)
    const timer = setInterval(() =>{ 
      
      setOrder((origOrder) => {
        const newOrder = origOrder.slice()
        newOrder.pop()
      
      console.log("order: "+order)

    if(newOrder.length === 0){
      clearInterval(timer)
      setIsDeactivating(false)
    }
    return newOrder  
  })

  }, 300)
  }

  const activateCells = (index) => {
    const newOrder=[...order, index]
    setOrder(newOrder)

    console.log(order)
    if(newOrder.length === config.flat(1).filter(Boolean).length){
      deactivateCells();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Grid Lights
      </header>
      <div className="gridLight"
        style={{
          gridTemplateColumns: `repeat(${config[0].length},1fr)`
        }}
      >
        {/* flat is used to change the matrix to a single row array */}
        {config.flat(1).map((value, index) => {
          return value? <Cell 
            key={index}
            label={`Cell ${index}`}
            filled={order.includes(index)}
            onClick={()=>activateCells(index)}
            isDisabled={ order.includes(index) || isDeactivating }
          /> : <span />
        })}
        <span>{order[order.length-1]}</span>
      </div>
    </div>
  );
}

export default App;
