import React from "react"
import UserCard from "./UserCard"
import { useEffect, useState } from "react";

const UserList = ()=>{

    const[users, setUser] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            let res = await fetch(`https://jsonplaceholder.typicode.com/users`);
            let data = await res.json();
            setUser(data);
        }
        fetchData();

  },[])

    return(
            <div style={{display:'flex', flexWrap:'wrap', gap:'5px', padding:'1px'}}>
                {users.map((user)=>(
                    <UserCard key={user.id} id={user.id} name = {user.name} username = {user.username} email = {user.email}/>
                ))}
            </div>
    )
}


export default UserList