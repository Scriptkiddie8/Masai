import React from "react"

function Child({message}){
    return(
        <>
        <p>I'm a Child Comp</p>
        <h4>Got this from Parent: {message}</h4>
        </>
    )
}

export default Child