import React from "react"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const UserDetail = ()=>{

    const {userId} = useParams();
    const [user, setUser] = useState([]);


    useEffect(()=>{
        async function fetchData(){
        let res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let data = await res.json();
        setUser(data);
        }
        fetchData();


  },[userId])

  console.log(user)
    return(
    <div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>Website: {user.website}</p>
        <p>Address: {user.address.street}</p>
    </div>
    )
}

export default UserDetail