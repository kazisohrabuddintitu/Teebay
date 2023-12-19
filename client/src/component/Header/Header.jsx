import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';

const Header = () => {
  const { userId, logout } = useContext(AuthContext);

  //Handling log out
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {userId && ( 
        <div className="navbar bg-indigo-600 text-primary-content flex flex-wrap items-center justify-end mx-auto p-4 gap-5">
          <Link className="text-sm font-semibold" to="/home">
            All Products
          </Link>
          <Link className="text-sm font-semibold " to="/myproducts">
            My Products
          </Link>
          <Link className="text-sm bg-red-700 hover:bg-red-700 font-semibold px-3 py-1 rounded-md" onClick={handleLogout} to="/">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

