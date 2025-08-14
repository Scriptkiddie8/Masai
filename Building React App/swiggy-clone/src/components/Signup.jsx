import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { SWIGGY_LOGO } from "../utils/constant";

console.log(">>> Signup.jsx file is loaded"); 
function Signup(){
    const dispatch = useDispatch()
    const {user, loading, error} = useSelector((state)=>state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Submitting with :" ,email, password)

        if(!email || !password){
            setFormError("Please fill the form ");
            return;
        }

        if(password.length <6){
            setFormError("Password must be at least 6 characters");
            return;
        }
        setFormError("");
        dispatch(signupUser({email, password}));
    }

    console.log("mounted")

    return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-4">
            {/* {swiggy logo} */ }
            <img className="w-24 h-auto" src={SWIGGY_LOGO} alt="Swiggy Logo" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup for Swiggy</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded"/>

            {/* form validation error handling */}
            {formError && (<div className="text-red-500 text-sm mb-2">{formError}</div>)}

            {/* backend error handling */}
            {error && (<div className="text-red-500 text-sm mb-2">{error}</div>)}

            <button type="submit" disabled={loading} className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-600">{loading ? "Signing up...." : "Signup"}</button>
        </form>
    </div>)
}

export default Signup
