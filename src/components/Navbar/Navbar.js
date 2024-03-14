/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import ES2Logo from '../../es2-logo-final.jpg';
import {useNavigate} from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  const handleNavigation = (navTo) => {
    navigate(navTo);
  };
  return (
    <div className="navbar-container">
      <section className="navbar-logo-container">
        <a href="https://www.binghamton.edu/es2/index.html" target='_blank' rel="noreferrer">
          <img className="navbar-logo" src={ES2Logo} alt='ES2'></img>
        </a>
      </section>
      <section className="navbar-items">
        <section className='navbar-item'>
          <a onClick={() => handleNavigation('/publication')}>Publication</a>
        </section>
        <section className='navbar-item'>
          <a onClick={() => handleNavigation('/patent')}>Patent</a>
        </section>
        <section className='navbar-item'>
          <a onClick={() => handleNavigation('/project')}>Project</a>
        </section>
        <section className='navbar-item'>
          <a onClick={() => handleNavigation('/settings')}>Settings</a>
        </section>
        <section onClick={handleLogout} className="navbar-item">
                    Logout
        </section>
      </section>
    </div>
  );
}

export default NavBar;
