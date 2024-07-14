import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import userEvent from '@testing-library/user-event';

function App() {

  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() =>{
    setInterval(() => {
      setValue((val)=> val + 1);
    }, 100);
  },[])

  return (
    <div className="App">
      <header className="App-header">
      <span>Progress Bar</span>
      </header>
      <ProgressBar value={value} onComplete={()=>setSuccess(true)} />
      <span>{success? "Complete!": "Loading..."}</span>
    </div>
  );
}

export default App;
