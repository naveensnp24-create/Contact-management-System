import {useState,useEffect, useContext} from "react";
import GlobalContext from "../contexts/GlobalContext"



const UserDetails=()=>{
  const{currentPage}=useContext(GlobalContext);
  const[loading,setLoading]=useState(true)
  const[userData,setUserData]=useState({})

 useEffect(()=>{
   const fetchData=async()=>{
    setLoading(true)
    const response=await fetch(`https://jsonplaceholder.typicode.com/users/${currentPage}`);
    const data =await response.json()
    setLoading(false)
    console.log(data)
    setUserData(data)
   }
   fetchData()
 },[currentPage])


    return(
        <div className="bg-gray-400 w-[400px] mx-auto rounded-xl p-4 m-4 shadow-lg">
            <h1 className="text-2xl text-bold">User Details</h1>

            {loading ?( <p>Loading...</p>)
            :(
            <>
            <p className="text-lg text-black"><strong>Name:</strong> {userData.name}</p>
            <p className="text-lg text-black"><strong>Email:</strong> {userData.email}</p>
            <p className="text-lg text-black"><strong>Phone:</strong> {userData.phone}</p>
            <p className="text-lg text-black"><strong>Website:</strong> {userData.website}</p>
            <p className="text-lg text-black"><strong>Company:</strong> {userData.company.name}</p>
            <p></p>
            </>
           )}
        </div>
            
        )
}

export default UserDetails;