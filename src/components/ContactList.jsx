import { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { useOutletContext } from 'react-router-dom';

const ContactList = () => {
  const { setSearchHandler, setAddContactHandler, setShowForm, showForm } = useOutletContext();
  
  // keeping track of contacts - both filtered and original list
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', bloodGroup: 'A+' });
  const [editingContact, setEditingContact] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // all possible blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // load contacts when component mounts or filter changes
  useEffect(() => {
    const email = localStorage.getItem('userEmail') || 'user@example.com';
    setUserEmail(email);
    fetchFromDatabase(email, filter);
  }, [filter]);

  // re-filter whenever search term changes
  useEffect(() => {
    filterContacts();
  }, [searchTerm, allContacts]);

  useEffect(() => {
    setSearchHandler(() => handleSearch);
    setAddContactHandler(() => toggleForm);
  }, [setSearchHandler, setAddContactHandler]);

  const fetchFromDatabase = async (email = userEmail, bloodGroupFilter = filter) => {
    try {
      const response = await contactAPI.getContacts(bloodGroupFilter, email);
      setAllContacts(response.data);
      setContacts(response.data);
    } catch (error) {
      console.error('Hmm, something went wrong fetching contacts:', error);
      // just clear everything if fetch fails
      setAllContacts([]);
      setContacts([]);
    }
  };

  const filterContacts = () => {
    if (!searchTerm) {
      // no search term? show everything
      setContacts(allContacts);
      return;
    }
    
    // search through name, phone, and blood group
    const filtered = allContacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setContacts(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({ name: contact.name, phone: contact.phone, bloodGroup: contact.bloodGroup });
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(prevShowForm => {
      const newShowForm = !prevShowForm;
      
      // clear form when closing
      if (prevShowForm) { 
        setFormData({ name: '', phone: '', bloodGroup: 'A+' });
        setEditingContact(null);
      }
      return newShowForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingContact) {
        // updating existing contact
        await contactAPI.updateContact(editingContact._id, formData);
      } else {
        // creating new contact
        await contactAPI.addContact(formData, userEmail);
      }
      
      // reset everything after successful save
      setFormData({ name: '', phone: '', bloodGroup: 'A+' });
      setEditingContact(null);
      setShowForm(false);
      fetchFromDatabase(userEmail, filter);
    } catch (error) {
      console.error('Oops, failed to save contact:', error);
      alert('Could not save the contact. Is the backend server running?');
    }
  };

  const handleCall = async (id) => {
    try {
      await contactAPI.recordCall(id);
      // refresh to show updated call count
      fetchFromDatabase(userEmail, filter);
    } catch (error) {
      console.error('Failed to record call:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactAPI.deleteContact(id);
      // reload contacts after deletion
      fetchFromDatabase(userEmail, filter);
    } catch (error) {
      console.error('Could not delete contact:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Filter by Blood Group:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 w-full max-w-xs">
          <option value="">All Blood Groups</option>
          {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
      </div>

      {showForm && <div className="bg-slate-700 text-white p-4 rounded-lg shadow-md mb-4">
        <label className="text-xl font-bold block mb-4">{editingContact ? 'Edit Contact' : 'Add New Contact'}</label>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name:</label>
              <input type="text" value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-600 text-white border border-slate-500 rounded px-3 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone:</label>
              <input type="tel" value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-600 text-white border border-slate-500 rounded px-3 py-2 w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Blood Group:</label>
              <select value={formData.bloodGroup}
                onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="bg-slate-600 text-white border border-slate-500 rounded px-3 py-2 w-full">
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {editingContact ? 'Update' : 'Save'}
          </button>
        </form>
      </div>}

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No contacts found. Add some contacts to get started!</p>
          </div>
        ) : (
          contacts.map(contact => (
            <div key={contact._id} className="flex flex-col p-4 w-full bg-slate-700 text-white rounded-lg shadow-md">
              <div className="mb-2">
                <p className="text-xl font-bold">Name: {contact.name}</p>
                <p className="text-xl">Phone: {contact.phone}</p>
                <p className="text-xl">Blood Group: <span className="bg-slate-600 text-white px-2 py-1 rounded text-sm">{contact.bloodGroup}</span></p>
              </div>
            <div className="flex flex-wrap gap-2 mt-2">
                <button onClick={() => handleCall(contact._id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-slate-500 text-sm flex-1 min-w-[80px]">
                  Call ({contact.callCount})
                </button>
                <button onClick={() => handleEdit(contact)}
                  className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-500 text-sm flex-1 min-w-[80px]">
                  Edit
                </button>
                <button onClick={() => handleDelete(contact._id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-slate-500 text-sm flex-1 min-w-[80px]">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;