import {useContext} from "react"
import GlobalContext from "../contexts/GlobalContext";

const Pagination = () =>{

    const {currentPage,setCurrentPage} =useContext(GlobalContext);
    
    const handlePrevious= () =>{
        setCurrentPage(currentPage-1);
        localStorage.setItem('Page',currentPage-1)
    }

    const handleNext = () =>{
        setCurrentPage(currentPage+1);
        localStorage.setItem('Page',currentPage+1)
    }

    return (
        <div className="w-[300px] mx-auto bg-yellow-200 m-4 p-4 rounded-md flex flex-row shadow-lg space-x-4 items-center justify-around">
            <button className="p-4 bg-blue-500 rounded-md" onClick={handlePrevious}>{"<"}</button>
             <div className="p-4 bg-orange-400 rounded-md">{currentPage}</div>
            <button className="p-4 bg-blue-500 rounded-md" onClick={handleNext}>{">"}</button>
        </div>
    )
}

export default Pagination;