import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx"
import { useState } from 'react';

const Homelayout = () => {
    const location = useLocation();
    const [searchHandler, setSearchHandler] = useState(null);
    const [addContactHandler, setAddContactHandler] = useState(null);
    const [showForm, setShowForm] = useState(false);
    
    const isContactPage = location.pathname === '/' || location.pathname === '/contact';
    
    return (
        <>
            <Header 
                onSearch={searchHandler} 
                showAddButton={isContactPage} 
                onAddContact={addContactHandler}
                showForm={showForm}
            />
            <Outlet context={{ setSearchHandler, setAddContactHandler, setShowForm, showForm }} />
        </>
    )
}

export default Homelayout;