import { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [bloodGroupFilter, setBloodGroupFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '', bloodGroup: '' });
    const [editContact, setEditContact] = useState({ id: '', name: '', phone: '', bloodGroup: '' });

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        let filtered = contacts;
        
        if (bloodGroupFilter) {
            filtered = filtered.filter(contact => contact.bloodGroup === bloodGroupFilter);
        }
        
        if (searchTerm) {
            filtered = filtered.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.phone.includes(searchTerm)
            );
        }
        
        setFilteredContacts(filtered);
    }, [contacts, bloodGroupFilter, searchTerm]);

    const fetchContacts = async () => {
        try {
            const response = await contactAPI.getContacts();
            setContacts(response.data);
        } catch (error) {
            toast.error('Failed to fetch contacts');
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            await contactAPI.addContact(newContact);
            toast.success('Contact added successfully');
            setNewContact({ name: '', phone: '', bloodGroup: '' });
            setShowAddForm(false);
            fetchContacts();
        } catch (error) {
            toast.error('Failed to add contact');
        }
    };

    const handleEditContact = async (e) => {
        e.preventDefault();
        try {
            await contactAPI.updateContact(editContact.id, {
                name: editContact.name,
                phone: editContact.phone,
                bloodGroup: editContact.bloodGroup
            });
            toast.success('Contact updated successfully');
            setEditContact({ id: '', name: '', phone: '', bloodGroup: '' });
            setShowEditForm(false);
            fetchContacts();
        } catch (error) {
            toast.error('Failed to update contact');
        }
    };

    const openEditForm = (contact) => {
        setEditContact({
            id: contact._id,
            name: contact.name,
            phone: contact.phone,
            bloodGroup: contact.bloodGroup
        });
        setShowEditForm(true);
    };

    const handleDeleteContact = async (id) => {
        try {
            await contactAPI.deleteContact(id);
            toast.success('Contact deleted successfully');
            fetchContacts();
        } catch (error) {
            toast.error('Failed to delete contact');
        }
    };

    const handleCall = async (id, name) => {
        try {
            await contactAPI.recordCall(id);
            toast.success(`Call recorded for ${name}`);
            fetchContacts();
        } catch (error) {
            toast.error('Failed to record call');
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Add Contact
                    </button>
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 flex-1"
                    />
                    <select
                        value={bloodGroupFilter}
                        onChange={(e) => setBloodGroupFilter(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
                    >
                        <option value="">All Blood Groups</option>
                        {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                {showEditForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold text-white mb-4">Edit Contact</h2>
                            <form onSubmit={handleEditContact}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={editContact.name}
                                    onChange={(e) => setEditContact({...editContact, name: e.target.value})}
                                    className="w-full bg-gray-700 text-white p-2 rounded mb-3"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={editContact.phone}
                                    onChange={(e) => setEditContact({...editContact, phone: e.target.value})}
                                    className="w-full bg-gray-700 text-white p-2 rounded mb-3"
                                    required
                                />
                                <select
                                    value={editContact.bloodGroup}
                                    onChange={(e) => setEditContact({...editContact, bloodGroup: e.target.value})}
                                    className="w-full bg-gray-700 text-white p-2 rounded mb-4"
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditForm(false)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold text-white mb-4">Add New Contact</h2>
                            <form onSubmit={handleAddContact}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newContact.name}
                                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                                    className="w-full bg-gray-700 text-white p-2 rounded mb-3"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={newContact.phone}
                                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                                    className="w-full bg-gray-700 text-white p-2 rounded mb-3"
                                    required
                                />
                                <select
                                    value={newContact.bloodGroup}
                                    onChange={(e) => setNewContact({...newContact, bloodGroup: e.target.value})}
                                    className="w-full bg-gray-700 text-white p-2 rounded mb-4"
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid gap-4">
                    {filteredContacts.map(contact => (
                        <div key={contact._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-semibold">{contact.name}</h3>
                                <p className="text-gray-400">{contact.phone}</p>
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">{contact.bloodGroup}</span>
                                <p className="text-gray-500 text-sm mt-1">Calls: {contact.calls?.length || 0}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleCall(contact._id, contact.name)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                >
                                    Call
                                </button>
                                <button
                                    onClick={() => openEditForm(contact)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteContact(contact._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactList;