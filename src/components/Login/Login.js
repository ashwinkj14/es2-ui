/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import logo from '../../es2-logo-final.jpg';
import './Login.css';

function doLogin() {
  const usernameElement = document.getElementById('login-username');
  const username = usernameElement.value;
  if (username === '') {
    console.log('username is required');
    alert('username is required');
    usernameElement.focus();
    return false;
  }
  const passwordElement = document.getElementById('login-password');
  const password = passwordElement.value;
  if (password === '') {
    console.log('password is required');
    alert('password is required');
    passwordElement.focus();
    return false;
  }
  const userTypeElement = document.getElementById('login-usertype');
  const userType = userTypeElement.value;
  if (userType === '') {
    console.log('select usertype');
    alert('usertype is required');
    userTypeElement.focus();
    return false;
  }

  const api = `login`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const errorMsg = 'Error occurred. Unable to login!';
  const data = invokeAPI(api, options, errorMsg);
  if (data.result === 'success') {
    window.location.href = '/publication';
  }
}

function invokeAPI(api, options, errorMsg) {
  fetch(api, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(errorMsg);
        }
        return response.json();
      })
      .then((data) => {
        if (data.result !== 'success') {
          throw new Error(errorMsg);
        }
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
}


function Login() {
  return (
    <div className='login-body'>
      <section className='banner'>
        <div>
          <img src={logo} alt='ES2'/>
        </div>
      </section>

      <section className='login-section'>
        <div className='login-container'>
          <div className='login-header'>Publication Repository</div>
          <section className='login-input-container'>
            <input id="login-username" className="login-input"
              placeholder='username'></input>
            <input id="login-password" className="login-input" type='password'
              placeholder='password'></input>
            <select id="login-usertype" className="login-input"
              required name="usertype">
              <option value="">usertype</option>
              <option value="admin">admin</option>
              <option value="member company">member company</option>
              <option value="student">student</option>
              <option value="faculty">faculty</option>
            </select>
            <section className='login-btn-container'>
              <button className='login-btn' onClick={doLogin}>Login</button>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Login;
