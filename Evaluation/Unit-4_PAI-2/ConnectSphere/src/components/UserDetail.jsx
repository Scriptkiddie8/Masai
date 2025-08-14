import React from "react"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const UserDetail = ()=>{

    const {userId} = useParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(()=>{
        async function fetchData(){
        let res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let data = await res.json();
        setUser(data);
        }
        fetchData();

        async function postData(){
            let res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            let data = await res.json();
            setPosts(data);
        }
        postData();

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

        <h3>Blog Posts:</h3>
        {posts.map((post) =>(
            <div>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
            </div>
        ))}

    </div>
    )
}

export default UserDetail