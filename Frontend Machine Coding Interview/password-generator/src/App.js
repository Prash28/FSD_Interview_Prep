import './App.css';
import {useState} from "react";
import usePasswordGenerator from './hooks/use-password-generator'
import PasswordStrengthIndicator from './components/StrengthChecker'
import Button from './components/Button'
import Checkbox from './components/Checkbox';

function App() {

  const [length, setLength] = useState(4);

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false},
    { title: "Include Lowercase Letters", state: false},
    { title: "Include Numbers", state: false},
    { title: "Include Symbols", state: false},
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedCheckbox = [...checkboxData]
    updatedCheckbox[index].state = !updatedCheckbox[index].state
    setCheckboxData(updatedCheckbox)
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500)
  }

  return (
    <div className="App">
      <header className="App-header">
        Password Generator
      </header>
      <div className="password">
        {
        password && (
        <div className="title">
          <span className="gen-password">{password}</span>
          {/* <button type="button" className="copy-button" onClick={handleCopy}>
            {copied ? "COPIED" : "COPY"}
          </button> */}
          <Button onClick={handleCopy} customClass="copy-button" text={copied? "COPIED" : "COPY"}/>
        </div> 
        )}
        <div className="char-length">
          <span>
            <label>Character Length</label>
            <label className="char-length-value">{length}</label>
          </span>
          <input type="range"
                 min='4'
                 max='20'
                 value={length}
                 onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return(
              // <div key={index}>
              //   <input
              //     type="checkbox"
              //     checked={checkboxData.state}
              //     onChange={() => { handleCheckboxChange(index) }} 
              //   />
              //   <label>{checkbox.title}</label>
              // </div>
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => handleCheckboxChange(index)}
                checked={checkboxData.state}
                />
            );
          })
        }
        </div>
        <PasswordStrengthIndicator password={password}/>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {/* <button type="button" className="generate-btn" onClick={() => generatePassword(checkboxData, length)}>GENERATE PASSWORD</button> */}
        <Button onClick={() => generatePassword(checkboxData, length)} customClass="generate-btn" text="GENERATE PASSWORD"/>
      </div>
    </div>
  );
}

export default App;
