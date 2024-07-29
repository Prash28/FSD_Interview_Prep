import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home/index.js'
import Login from './components/Login/index.js'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        AmazonClone
      </header>
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route exact path="/" element={<Home />}></Route>
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
