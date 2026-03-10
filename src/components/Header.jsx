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
        <div className="flex flex-row p-5 w-full gap-5 bg-blue-500 items-center text-white">
            <a className="text-2xl font-bold cursor-pointer" onClick={handleAdduser}>Contacts</a>
            <a className="text-2xl font-bold cursor-pointer" onClick={handleDashboard}>Dashboard</a>
            <a className="text-2xl font-bold cursor-pointer" onClick={handleSupport}>Support</a>
            <input type="text" placeholder="Search contacts..." value={searchTerm}
                onChange={handleSearchChange}
                className="px-3 py-2 rounded bg-white text-black" />
            {showAddButton && (
                <button onClick={onAddContact}
                    className={`px-4 py-2 rounded text-white ${
                        showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}>
                    {showForm ? 'Cancel' : 'Add Contact'}
                </button>
            )}
            {isLoggedIn ? (
                <button className="text-xl rounded-xl ml-auto p-2 bg-blue-600 hover:bg-slate-500 text-white font-bold" onClick={handleLogout}>Logout</button>
            ) : (
                <button className="text-xl rounded-xl ml-auto p-2 bg-blue-800 hover:bg-slate-400 text-white font-bold" onClick={handleLogin}>Login</button>
            )}
        </div>
    )
}

export default Header;
