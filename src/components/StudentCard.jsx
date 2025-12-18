// import React from 'react'
const StudentCard=(props)=>{
    console.log(props)
    const {fname,lname,age}=props;
    return (
        <>
        
        <div className="shadow-lg p-4 rounded-md">
            First Name:{fname}<br/>
            Last Name:{lname}<br/>
            Full Name:{fname} {lname}<br/>
            Age:{age} 
            </div>
        </>
    )
};


export default StudentCard