/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import ES2Logo from '../../es2-logo-final.jpg';
import './Navbar.css';

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <div className="navbar-container">
      <section className="navbar-logo-container">
        <img className="navbar-logo" src={ES2Logo} alt='ES2'></img>
      </section>
      <section className="navbar-items">
        <section className='navbar-item'>
          <a href='/publication'>Publication</a>
        </section>
        <section className='navbar-item'>
          <a href='/settings'>Settings</a>
        </section>
        <section onClick={handleLogout} className="navbar-item">
                    Logout
        </section>
      </section>
    </div>
  );
}

export default NavBar;
