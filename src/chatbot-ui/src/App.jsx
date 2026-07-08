
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { useState, useEffect } from 'react';

import Home from './views/Home';


function App() {
  return (
    <div>
        {/*define routes*/}
        <Router>
          <Routes>
            <Route path="/" exact={true} element={<div>Login Page</div>} />
            <Route path="/home" exact={true} element={<Home />} /> {/* This works because our root path (just the "/") is what appears when the page is opened*/}
            <Route path="/settings" exact={true} element={<div>PSettings Page</div>}/>
            <Route path="/account" exact={true} element={<div>Account Page</div>}/>
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;