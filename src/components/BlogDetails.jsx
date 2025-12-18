import { useEffect, useState } from 'react'
import { useParams } from "react-router"

const BlogDetails=()=>{
    const {id }=useParams()
    const[blogs,setBlogs]=useState({})
    useEffect(()=>{
    const fetchBlog=async()=>{
        const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data =await response.json()
        setBlogs(data)
    }
    fetchBlog()
    },[id])    
    return(
        <div> 
            <h1 className="text-3xl mb-4">{blogs.title}</h1>

        </div>
    )
}