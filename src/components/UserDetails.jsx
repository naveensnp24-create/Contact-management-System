import { useState } from "react";


const UserDetails=(props)=>{
    const [name,setName]=useState("Null");

    const handleSubmit=()=>{


        setName(`${props.name}`)
        
    }

    return (
       <>
        <div  className=" flex flex-col p-4 w-100 m-4 bg-white  rounded-lg shadow-md">
           <label className="text-2xl font-bold flex flex-row justify-center items-center"> User Details</label>
           <p className="text-xl">Name: {props.name}</p>
           <p className="text-xl">Age: {props.age}</p>
           <p>{name}</p>

           <button type="button" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>click me</button>
           
        </div>
        </>
       
        
    )
}
export default UserDetails;