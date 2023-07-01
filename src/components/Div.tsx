
function Div(props: any) {
    return (
        <div
            className="div"
            {...props}
        >
            {props.children}
        </div>
    )
}

export default Div