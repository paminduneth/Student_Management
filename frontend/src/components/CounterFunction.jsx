import React, { useState } from "react";

function CounterFunction() {

    const [number, setNumber] = useState(0);

    const increment = () => {
        setNumber(prevNumber => prevNumber + 1);
    };



    return(
        <div>
            <h3>Functional Component</h3>
            <h1>Counter = {number}</h1>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

export default CounterFunction;