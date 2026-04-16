import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ activeView, setActiveView, role }) => {
    const navigate = useNavigate();

    const handleProfile=()=>{
        navigate('/profile')

    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveView('contacts')}
                            className={`px-4 py-2 rounded-lg ${
                                activeView === 'contacts' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            Contacts
                        </button>
                        <button
                            onClick={() => setActiveView('dashboard')}
                            className={`px-4 py-2 rounded-lg ${
                                activeView === 'dashboard' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveView('support')}
                            className={`px-4 py-2 rounded-lg ${
                                activeView === 'support' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            Support
                        </button>
                        {role === 'admin' && (
                            <button
                                onClick={() => setActiveView('admin')}
                                className={`px-4 py-2 rounded-lg ${
                                    activeView === 'admin'
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                All Users
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold" onClick={handleProfile}>
                            {sessionStorage.getItem('userEmail')?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;