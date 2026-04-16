import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import Dashboard from './components/Dashboard';
import Support from './components/Support';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import ContactProtectedRoute from './components/ContactProtectedRoute';
import AdminView from './components/AdminView';

const ContactApp = () => {
  const [activeView, setActiveView] = useState('contacts');
  const role = sessionStorage.getItem('role');

  const renderActiveView = () => {
    switch(activeView) {
      case 'contacts': return <ContactList />;
      case 'dashboard': return <Dashboard />;
      case 'support': return <Support />;
      case 'admin': return <AdminView />;
      default: return <ContactList />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navigation activeView={activeView} setActiveView={setActiveView} role={role} />
      {renderActiveView()}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route 
            path="/" 
            element={
              <ContactProtectedRoute>
                <ContactApp />
              </ContactProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
};

export default App;
