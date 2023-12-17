import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './component/Header/Header';
import { AuthProvider } from './providers/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
  );
};

export default App;

