/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import axios from 'axios';
import {FAILURE, displayToast} from '../ToastUtil';
import logo from '../../es2-logo-final.jpg';
import './Login.css';

function doLogin() {
  const usernameElement = document.getElementById('login-username');
  const username = usernameElement.value;
  if (username === '') {
    alert('username is required');
    usernameElement.focus();
    return false;
  }
  const passwordElement = document.getElementById('login-password');
  const password = passwordElement.value;
  if (password === '') {
    alert('password is required');
    passwordElement.focus();
    return false;
  }
  const userTypeElement = document.getElementById('login-usertype');
  const userType = userTypeElement.value;
  if (userType === '') {
    alert('usertype is required');
    userTypeElement.focus();
    return false;
  }

  const api = `http://localhost:8080/login`;

  const requestData = {
    username: username,
    password: password,
    usertype: userType,
  };

  axios.post(api, {
    body: JSON.stringify(requestData),
  }).then((response) => {
    if (response.status === 200) {
      if (response.data.result === 'success') {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/publication';
      } else {
        displayToast('Incorrect username/password', FAILURE);
      }
    } else {
      displayToast('Incorrect username/password', FAILURE);
    }
  });
}


function Login() {
  const token = localStorage.getItem('token');
  if (token !== undefined && token !== null) {
    const api = `http://localhost:8080/login`;

    axios.post(api, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.result === 'success') {
              window.location.href = '/publication';
            } else {
              localStorage.removeItem('token');
            }
          } else {
            localStorage.removeItem('token');
          }
        });
  }
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
