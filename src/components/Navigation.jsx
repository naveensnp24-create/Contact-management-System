import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Contact Manager</h1>
        <div className="flex space-x-4">
          <Link
            to="/contacts"
            className={`px-3 py-2 rounded ${isActive('/contacts') ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Contacts
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded ${isActive('/dashboard') ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;