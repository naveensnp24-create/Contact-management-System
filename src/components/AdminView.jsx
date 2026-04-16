import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await authAPI.getAllUsers();
            setUsers(res.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    const handleUserClick = async (user) => {
        setSelectedUser(user);
        setLoadingContacts(true);
        try {
            const res = await authAPI.getUserContacts(user._id);
            setContacts(res.data);
        } catch (error) {
            toast.error('Failed to fetch contacts');
        } finally {
            setLoadingContacts(false);
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {!selectedUser ? (
                    <>
                        <h1 className="text-3xl font-bold text-white mb-6">All Users</h1>
                        <p className="text-gray-400 mb-4">{users.length} registered users</p>
                        <div className="grid gap-3">
                            {users.map(user => (
                                <div
                                    key={user._id}
                                    onClick={() => handleUserClick(user)}
                                    className="bg-gray-800 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{user.email}</p>
                                            <p className="text-gray-400 text-sm">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="text-blue-400 text-sm">View contacts →</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => { setSelectedUser(null); setContacts([]); }}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                            >
                                ← Back
                            </button>
                            <h1 className="text-2xl font-bold text-white">{selectedUser.email}'s Contacts</h1>
                        </div>
                        {loadingContacts ? (
                            <p className="text-gray-400">Loading...</p>
                        ) : contacts.length === 0 ? (
                            <p className="text-gray-400">No contacts found for this user.</p>
                        ) : (
                            <div className="grid gap-4">
                                {contacts.map(contact => (
                                    <div key={contact._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h3 className="text-white font-semibold">{contact.name}</h3>
                                            <p className="text-gray-400">{contact.phone}</p>
                                            <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">{contact.bloodGroup}</span>
                                        </div>
                                        <p className="text-blue-400 text-sm">{contact.calls?.length || 0} calls</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminView;
