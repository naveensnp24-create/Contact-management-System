import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import { useState } from 'react';

const Header = ({ onSearch, showAddButton, onAddContact, showForm }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleLogin = () => {
        navigate('/login');
    }
    
    const handleLogout = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            try {
                await userAPI.logout(userEmail);
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
        localStorage.removeItem('userEmail');
        toast.success('Logged out successfully!');
        navigate('/login');
    }
    
    const handleAdduser = () => {
        navigate('/contact');
    }
    
    const handleDashboard = () => {
        navigate('/dashboard');
    }
    
    const handleSupport = () => {
        navigate('/support');
    }
    
    const isLoggedIn = localStorage.getItem('userEmail');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // pass search term to parent if handler exists
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="flex flex-row p-5 w-full gap-5 bg-blue-500 items-center">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            
            {/* navigation links */}
            <a className="flex text-2xl font-bold cursor-pointer" onClick={handleAdduser}>Contacts</a>
            <a className="flex text-2xl font-bold cursor-pointer" onClick={handleDashboard}>Dashboard</a>
            <a className="flex text-2xl font-bold cursor-pointer" onClick={handleSupport}>Support</a>
            
            {/* search bar */}
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-3 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
            
            {/* add/cancel button - only show on contact page */}
            {showAddButton && (
                <button
                    onClick={onAddContact}
                    className={`px-4 py-2 rounded text-white ${
                        showForm 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    {showForm ? 'Cancel' : 'Add Contact'}
                </button>
            )}
            
            {/* login/logout button */}
            {isLoggedIn ? (
                <button className="flex text-xl rounded-xl ml-auto p-2 bg-blue-600 hover:bg-slate-500 text-white font-bold" onClick={handleLogout}>Logout</button>
            ) : (
                <button className="flex text-xl rounded-xl ml-auto p-2 bg-blue-800 hover:bg-slate-400 text-white font-bold" onClick={handleLogin}>Login</button>
            )}
        </div>
    )
}

export default Header;