import { useEffect } from "react-router";

const BlogsList=()=>{
    const [blogs,setBlogs]=useEffect()
  useEffect(()=>{
     const fetchData=async()=>{
      
      const response=await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data =await response.json()
      
     }
     fetchData()
   },[])
}