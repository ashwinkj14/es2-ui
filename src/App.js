/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Publication from './components/Publication/Publication';
import Patent from './components/Patent/Patent';
import Settings from './components/Settings/Settings';
import NotFound from './components/404/NotFound';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/publication" element={<Publication/>}></Route>
          <Route path="/patent" element={<Patent/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
