const Checkbox = ({title, checked, onChange}) => {
    return(
            <div>
                <input
                    type="checkbox"
                    checked={checked}
                    onClick={onChange} 
                />
                <label>{title}</label>
            </div>
    )
}

export default Checkbox;