/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Login from './components/Login/Login';
import Publication from './components/Publication/Publication';
import Patent from './components/Patent/Patent';
import Project from './components/Project/Project';
import Settings from './components/Settings/Settings';
import NotFound from './components/404/NotFound';

import './App.css';
import NavBar from './components/Navbar/Navbar';
import Header from './containers/Header/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ConditionalNavBar/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/publication" element={<Publication/>}></Route>
          <Route path="/patent" element={<Patent/>}></Route>
          <Route path="/project" element={<Project/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ConditionalNavBar() {
  const location = useLocation();
  if (location.pathname === '/') {
    return null;
  }
  console.log(location.pathname);
  return (
    <section className="nav-container">
      <NavBar />
      <Header props={{page: location.pathname}}/>
    </section>
  );
}


export default App;
