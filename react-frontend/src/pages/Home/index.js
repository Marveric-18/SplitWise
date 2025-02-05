// Home.js
import React, { useEffect } from 'react';
import useAuth, { AuthProvider } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {loading, user, isLoggedIn} = useAuth(AuthProvider);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn()){
            navigate("/login")
        }
      }, [user]); 
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
