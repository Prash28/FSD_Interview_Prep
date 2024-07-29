const PasswordStrengthIndicator = ({password = ""}) => {
    const getPasswordStrength = () => {
        const passwordLength = password.length;
        // console.log("password:" + password)
        if(passwordLength < 1){
            return "";
        } else if(passwordLength <= 4){
            return "Very Weak";
        } else if(passwordLength < 8){
            return "Poor";
        } else if(passwordLength < 12){
            return "Medium";
        } else if(passwordLength < 25){
            return "Very Strong";
        } else{
            return "Super Strong";
        }
    }

const passwordStrength = getPasswordStrength();
let strengthColor;
switch(passwordStrength){
    case "" || "Very Weak":
        strengthColor="red";
        break;
    case "Poor":
        strengthColor="yellow";
        break;
    case "Medium":
        strengthColor="orange";
        break;
    case "Very Strong" || "Super Strong":
        strengthColor="green";
        break;
    default:
        break;    
}
// console.log("strength color"+ strengthColor)
return(
    <>
    { password && (
        <div className="pass-strength">
            Strength: <span style={{fontWeight: 700, color: `${strengthColor}`}}>{passwordStrength}</span>
        </div>
    )}
    </>
)
}

export default PasswordStrengthIndicator;