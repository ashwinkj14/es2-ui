/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Login from './components/Login/Login';
import Publication from './components/Publication/Publication';
import Patent from './components/Patent/Patent';
import Project from './components/Project/Project';
import Settings from './components/Settings/Settings';
import NotFound from './components/404/NotFound';

import './App.css';
import NavBar from './components/Navbar/Navbar';
import Header from './containers/Header/Header';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ConditionalNavBar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route caseSensitive path="/publication" element={<Publication/>}/>
          <Route caseSensitive path="/patent" element={<Patent/>}/>
          <Route caseSensitive path="/project" element={<Project/>}/>
          <Route caseSensitive path="/settings" element={<Settings/>}/>
          <Route caseSensitive path="/ForgotPassword" element={<ForgotPassword/>}/>
          <Route caseSensitive path="/ResetPassword" element={<ResetPassword/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ConditionalNavBar() {
  const location = useLocation();
  const path = location.pathname;
  const pathsWithHeader = ['/publication', '/patent', '/project', '/settings'];
  if (!pathsWithHeader.includes(path)) {
    return null;
  }
  return (
    <section className="nav-container">
      <NavBar />
      <Header props={{page: path}}/>
    </section>
  );
}


export default App;
