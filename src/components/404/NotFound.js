/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import logo from '../../es2-logo-final.jpg';
import '../Login/Login.css';
import './NotFound.css';

function NotFound() {
  return (
    <div className='login-body'>
      <section className='banner'>
        <div>
          <img src={logo} alt='ES2'/>
        </div>
      </section>
      <section className='not-found-content'>
        <div className='login-header'>
          <div style={{width: '500px', display: 'flex', justifyContent: 'center'}}>
            <span style={{fontSize: '100px'}}>404</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <br></br>
            <span>Page Not Found</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
