import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import React from "react";
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Single from './pages/Single';
import Home from './pages/Home';
import Write from './pages/Write';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<Single />} />
            <Route path="write" element={<Write />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      <div className='container'></div> {/* Not needed but kept as is */}
    </div>
  );
}

export default App;
