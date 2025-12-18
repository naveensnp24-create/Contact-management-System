import {useState } from "react" 
const Counter=()=>{
    const[count,setCount]=useState(0)
    
    const increment =()=>{
        console.log("Increment button clicked");
        setCount(count + 1);

    };
    const decrement =()=>{
        console.log("decrement button clicked");
        setCount(count - 1);

    };
    return (
        <div className="w-[300px] bg-yellow-100 m-4 mx-auto shadow-lg p-4 rounded-md  flex-col items-center justify-center " >
            <h1 className="flex justify-center text-xl mb-2">Add items</h1>
            <p className="flex font-bold text-4xl mb-2 justify-center">{count}</p>
            <div className="flex justify-center gap-2">
                <button className="bg-red-400 hover:bg-red-200 text-white px-4 py-2 rounded-md"onClick={decrement}>-</button>
                <button className="bg-blue-400 hover:bg-blue-200 text-white px-4 py-2 rounded-md"onClick={increment}>+</button>
            </div>
        </div>
    )
}
export  default Counter;