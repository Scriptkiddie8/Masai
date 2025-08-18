import React from "react";
import Child from "./Child";

function Middle({message}){
    return(
       <>
            <h2>I'm middle Component</h2>
            <p>Below is a child Component</p>
            <Child message={message}/>
       </>
    )
}

export default Middle;