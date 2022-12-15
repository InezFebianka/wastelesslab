function ButtonPrimary(props){
    const buttonStyle = {
        padding: "10px",
        border: "1px solid black"
    }
    return (
        <button style={buttonStyle}> {props.msg} </button>
    )
}

export default ButtonPrimary;