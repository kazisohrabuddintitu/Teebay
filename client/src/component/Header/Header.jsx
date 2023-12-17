import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';

const Header = () => {
  const { userId, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {userId && ( 
        <div className="navbar bg-primary text-primary-content">
          <Link className="btn btn-ghost normal-case text-lg" to="/home">
            All Products
          </Link>
          <Link className="btn btn-ghost normal-case text-lg" to="/myproducts">
            My Products
          </Link>
          <Link className="btn btn-ghost normal-case text-lg" onClick={handleLogout} to="/">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

