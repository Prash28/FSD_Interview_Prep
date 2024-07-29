import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const generatePassword = (checkboxData, length) => {
        // console.log("fun called")
        let charset="", generatedPassword = ""
        const selectedOptions = checkboxData.filter(eachOption => eachOption.state);
        
        if(selectedOptions.length === 0){
            setErrorMessage("Select atleast one option")
            setPassword("")
            return
        }

        selectedOptions.forEach((option) => {
            switch(option.title){
                case "Include Uppercase Letters":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include Lowercase Letters":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Numbers":
                    charset += "0123456789";
                    break;
                case "Include Symbols":
                    charset += "()*&^%$#@!?";
                    break;
                default:
                    break;
            }
        })

        for(let i=0;i<length;i++){
            let currentIndex = Math.floor(Math.random() * charset.length)
            generatedPassword += charset[currentIndex];
        }
        // console.log({generatedPassword})
        setPassword(generatedPassword)
        setErrorMessage("")
    }
    return { password, errorMessage, generatePassword }
}

export default usePasswordGenerator;