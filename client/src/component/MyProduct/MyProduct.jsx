import React, { useContext } from "react";
import AuthPorviders, { AuthContext } from "../../providers/AuthPorviders";

const MyProduct = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>This is Home {user && <span>{user.email}</span>}</h2>
    </div>
  );
};

export default MyProduct;