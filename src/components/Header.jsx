import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import { useState } from 'react';

const Header = ({ onSearch, showAddButton, onAddContact, showForm }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    
    const handleLogin = () => {
        navigate('/login');
        setMenuOpen(false);
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
        setMenuOpen(false);
    }
    
    const handleAdduser = () => {
        navigate('/contact');
        setMenuOpen(false);
    }
    
    const handleDashboard = () => {
        navigate('/dashboard');
        setMenuOpen(false);
    }
    
    const handleSupport = () => {
        navigate('/support');
        setMenuOpen(false);
    }
    
    const isLoggedIn = localStorage.getItem('userEmail');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="flex flex-wrap p-3 md:p-5 w-full gap-2 md:gap-5 bg-blue-500 items-center text-white">
            <a className="text-base md:text-2xl font-bold cursor-pointer" onClick={handleAdduser}>Contacts</a>
            <a className="text-base md:text-2xl font-bold cursor-pointer" onClick={handleDashboard}>Dashboard</a>
            <a className="text-base md:text-2xl font-bold cursor-pointer" onClick={handleSupport}>Support</a>
            
            <div className="relative flex-1 min-w-[150px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-8 md:pl-10 pr-2 md:pr-3 py-1.5 md:py-2 text-sm md:text-base rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
            
            {showAddButton && (
                <button
                    onClick={onAddContact}
                    className={`px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded text-white ${
                        showForm 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    {showForm ? 'Cancel' : 'Add'}
                </button>
            )}
            
            {isLoggedIn ? (
                <button className="text-sm md:text-xl rounded-xl ml-auto px-2 md:px-3 py-1.5 md:py-2 bg-blue-600 hover:bg-slate-500 text-white font-bold" onClick={handleLogout}>Logout</button>
            ) : (
                <button className="text-sm md:text-xl rounded-xl ml-auto px-2 md:px-3 py-1.5 md:py-2 bg-blue-800 hover:bg-slate-400 text-white font-bold" onClick={handleLogin}>Login</button>
            )}
        </div>
    )
}

export default Header;
