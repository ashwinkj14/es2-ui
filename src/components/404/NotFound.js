/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import logo from '../../es2-logo-final.jpg';
import '../Login/Login.css';

function NotFound() {
  return (
    <div className='login-body'>
      <section className='banner'>
        <div>
          <img src={logo} alt='ES2'/>
        </div>
      </section>
      <section className='login-section'>
        <div className='login-header'>The page you’re looking for can’t be found.</div>
      </section>
    </div>
  );
}

export default NotFound;
