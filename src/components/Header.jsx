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
        <div className="bg-blue-500 text-white">
            <div className="flex flex-row p-4 w-full items-center justify-between">
                {/* hamburger menu button */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                
                {/* desktop navigation */}
                <div className="hidden lg:flex items-center gap-4">
                    <a className="text-lg font-bold cursor-pointer hover:text-blue-200" onClick={handleAdduser}>Contacts</a>
                    <a className="text-lg font-bold cursor-pointer hover:text-blue-200" onClick={handleDashboard}>Dashboard</a>
                    <a className="text-lg font-bold cursor-pointer hover:text-blue-200" onClick={handleSupport}>Support</a>
                </div>
                
                {/* search bar - desktop */}
                <div className="hidden md:block relative flex-1 max-w-md mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-3 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                
                {/* desktop buttons */}
                <div className="hidden lg:flex items-center gap-2">
                    {showAddButton && (
                        <button
                            onClick={onAddContact}
                            className={`px-4 py-2 rounded text-white text-sm ${
                                showForm 
                                    ? 'bg-red-500 hover:bg-red-600' 
                                    : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {showForm ? 'Cancel' : 'Add Contact'}
                        </button>
                    )}
                    
                    {isLoggedIn ? (
                        <button className="text-sm rounded-lg px-4 py-2 bg-blue-600 hover:bg-slate-500 text-white font-bold" onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className="text-sm rounded-lg px-4 py-2 bg-blue-800 hover:bg-slate-400 text-white font-bold" onClick={handleLogin}>Login</button>
                    )}
                </div>

                {/* mobile add button */}
                {showAddButton && (
                    <button
                        onClick={onAddContact}
                        className={`lg:hidden px-3 py-2 rounded text-white text-sm ${
                            showForm 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {showForm ? 'Cancel' : 'Add'}
                    </button>
                )}
            </div>

            {/* mobile search bar */}
            <div className="md:hidden px-4 pb-3">
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-3 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
            </div>
            
            {/* mobile menu */}
            {menuOpen && (
                <div className="lg:hidden bg-blue-600 border-t border-blue-400">
                    <div className="flex flex-col p-4 space-y-3">
                        <a className="text-lg font-bold cursor-pointer hover:text-blue-200" onClick={handleAdduser}>Contacts</a>
                        <a className="text-lg font-bold cursor-pointer hover:text-blue-200" onClick={handleDashboard}>Dashboard</a>
                        <a className="text-lg font-bold cursor-pointer hover:text-blue-200" onClick={handleSupport}>Support</a>
                        <div className="pt-2 border-t border-blue-400">
                            {isLoggedIn ? (
                                <button className="w-full text-left text-lg font-bold hover:text-blue-200" onClick={handleLogout}>Logout</button>
                            ) : (
                                <button className="w-full text-left text-lg font-bold hover:text-blue-200" onClick={handleLogin}>Login</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header;
