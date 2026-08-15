
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import { useState, useEffect } from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebase';

import Home from './views/Home';
import Login from './views/Login';

import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [isAuthenticated, setAuthentication] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This watches Firebase to see if someone logs in or out
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Checking authentication status...</div>;

  return (
    <div>
      <title>GeorgeGPT</title>
        {/*define routes*/}
        <Router>
          <Routes>
            {/* If logged in, redirect away from login page to the chat */}
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser}/>} />
            {/* If logged out, redirect away from chat to the login page */}
            <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
            {/* The Chat route is locked down */}
            {/* <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            } /> */}
             {/* This works because our root path (just the "/") is what appears when the page is opened*/}
            <Route path="/settings" exact={true} element={<div>PSettings Page</div>}/>
            <Route path="/account" exact={true} element={<div>Account Page</div>}/>
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;