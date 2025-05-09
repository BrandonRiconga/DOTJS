function Button(props){
    const {onClick, type='button', title, variant='primary'} = props
    const variantClass = `btn btn-${variant}`

    return(
        <button className={variantClass} type={type} onClick={onClick} >
            {title}
        </button>
    )
}

export default Button