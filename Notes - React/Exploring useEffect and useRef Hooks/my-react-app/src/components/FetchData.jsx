import React, { useEffect, useState } from 'react';

function FetchData(){
    const[data, setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            let response = await fetch('https://fakestoreapi.in/api/products');
            let result = await response.json();
            setData(result.products)
            console.log(result.products);
        }
        fetchData()
    },[])

    return (
        <>
            <h1>Fetching FackStore Data</h1>
            {data.slice(0, 5).map((post, index)=>(
                <p key={post.id}>{index+1}.{post.title}</p>
            ))}
        </>
    )   
}

export default FetchData