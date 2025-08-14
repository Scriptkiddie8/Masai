import React from "react"
import { Link } from "react-router-dom"


const UserCard = ({id, name, username, email})=>{
    return(
            <div style={{border: '1px solid black', borderRadius: '10px', padding: '1px', margin:'1px', width:'200px'}}>
                <h3>{name}</h3>
                <p>{username}</p>
                <p>{email}</p>
                <button onClick={()=>{}}>Follow</button>
                <Link to={`/users/${id}`}>View Details</Link>
            </div>            
    )
}

export default UserCard