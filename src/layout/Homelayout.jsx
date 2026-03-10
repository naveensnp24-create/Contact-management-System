import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx"
import { useState } from 'react';

const Homelayout = () => {
    const location = useLocation();
    const [searchHandler, setSearchHandler] = useState(null);
    const [addContactHandler, setAddContactHandler] = useState(null);
    const [showForm, setShowForm] = useState(false);
    
    // check if we're on the contact page to show add button
    const isContactPage = location.pathname === '/' || location.pathname === '/contact';
    
    return (
        <div>        
            <Header 
                onSearch={searchHandler} 
                showAddButton={isContactPage} 
                onAddContact={addContactHandler}
                showForm={showForm}
            />
            {/* pass down handlers to child components */}
            <Outlet context={{ setSearchHandler, setAddContactHandler, setShowForm, showForm }} />
        </div>
    )
}

export default Homelayout;