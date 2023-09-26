/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import ES2Logo from '../es2-logo-final.jpg';
import '../styles/navbar.css';

function NavBar() {
  return (
    <div className="navbar-container">
      <section className="navbar-logo-container">
        <img className="navbar-logo" src={ES2Logo} alt='ES2'></img>
      </section>
      <section className="navbar-items">
        <section className='navbar-item'>
                    Publication
        </section>
        <section className='navbar-item'>
                    Settings
        </section>
        <section className="navbar-item">
                    Account
        </section>
      </section>
    </div>
  );
}

export default NavBar;
