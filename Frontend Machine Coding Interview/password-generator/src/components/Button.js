const Button = ({onClick, text, customClass}) => {
    return(
        <button type="button" className={customClass} onClick={onClick}>
            {text}
          </button>
    )
}

export default Button;