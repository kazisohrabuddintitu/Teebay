import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthPorviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const username = user?.email?.split("@")[0];
  // console.log(username);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        // setUser(null);
        navigate("/login");
        navigate(0);
        // alert("Logged out successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="navbar bg-primary text-primary-content">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Teebay
        </Link>
        <div className="ms-auto">
          {user && (
            <Link className="btn btn-ghost normal-case text-lg" to="/">
              Home
            </Link>
          )}
          {!user && (
            <>
              <Link className="btn btn-ghost normal-case text-lg" to="/login">
                Login
              </Link>
              <Link
                className="btn btn-ghost normal-case text-lg"
                to="/signup"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link className="btn btn-ghost normal-case text-lg" to="/profile">
                Profile
              </Link>
            </>
          )}
        </div>

        {user ? (
          <div className="ms-auto">
            <label className=" font-semibold text-lg mr-2">{username}</label>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.image} />
              </div>
            </label>
            <label onClick={handleSignOut}>
              <img className="w-8 h-8" src="icons8-logout-24.png" alt="" />
            </label>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
