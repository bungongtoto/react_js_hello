function Employee(props){
    return (
        <>
        <h3>Employee: {props.name}</h3>
        {props.role ? <p >{props.role}</p> : <p >No role</p> }
        </>
    );
}


export default Employee;