/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Publication from './components/publication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/publication" element={<Publication/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
