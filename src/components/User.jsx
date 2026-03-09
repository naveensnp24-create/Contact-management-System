
import UserDetails from './UserDetails.jsx';




const User=()=>{
  
    return (
        <>
        <div className=" min-h-screen  flex-col pb-50 bg-slate-800">
                     
        <div className="flex flex-row">
                <UserDetails name="Naveen" age={25}/>
                <UserDetails name="Ini" age={10}/>
                <UserDetails name="abu" age={10}/>
                <UserDetails name="vikash" age={10}/>
                <UserDetails name="mehanathan" age={10}/>
                <UserDetails name="vasanth" age={10}/>
                <UserDetails name="eswari" age={10}/>
        </div>
        
        </div>
        </>
    )
}
export default User;