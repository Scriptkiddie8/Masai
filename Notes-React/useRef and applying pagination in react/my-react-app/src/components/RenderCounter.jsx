import React, { useEffect, useRef, useState } from 'react'

function RenderCounter(){
    const [count, setCount] = useState(0);
    const renderCount = useRef(1);
    const prevCount = useRef(0);

    useEffect(()=>{
        renderCount.current += 1;
        prevCount.current = count;
    })

    return(
        <div>
            <h2>Counter:{count}</h2>
            <h2>prevCount:{prevCount.current}</h2>
            <button onClick={()=>setCount(prev=>prev+1)}>Increase Count</button>
            <p>Component Re-render:{renderCount.current} times</p>
        </div>
    )
}

export default RenderCounter