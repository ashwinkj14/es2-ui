/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Publication from './components/Publication/Publication';
import Settings from './components/Settings/Settings';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/publication" element={<Publication/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
