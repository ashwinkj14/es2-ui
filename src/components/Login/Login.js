/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useUserStore} from '../../store/es2Store';
import {FAILURE, displayToast} from '../ToastUtil';

import {BASE_URL} from '../../server-constants';
import logo from '../../es2-logo-final.jpg';

import './Login.css';
import {useEffect} from 'react';

function Login() {
  const navigate = useNavigate();
  const setUserTypeId = useUserStore((state) => state.setUserTypeId);
  const doLogin = () => {
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

    const api = BASE_URL+'/login';

    const requestData = {
      username: username,
      password: password,
      usertype: userType,
    };

    axios.post(api, requestData).then((response) => {
      if (response.status === 200) {
        if (response.data.result === 'success') {
          setUserTypeId(response.data.userTypeId);
          localStorage.setItem('token', response.data.token);
          navigate('/publication');
        } else {
          const message = response.data.message;
          if (message) {
            displayToast(message, FAILURE);
          } else {
            const error = response.data.error;
            displayToast(error, FAILURE);
          }
        }
      } else {
        displayToast('Error occurred', FAILURE);
      }
    }).catch((error) => {
      console.error(error);
      displayToast('Error occurred', FAILURE);
    });
  };

  const validateToken = (token) => {
    const api = BASE_URL+'/login';

    axios.post(api, {}, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.result === 'success') {
              setUserTypeId(response.data.userTypeId);
              navigate('/publication');
            } else {
              localStorage.removeItem('token');
            }
          } else {
            localStorage.removeItem('token');
          }
        });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(`token: ${token}`);
    if (token !== undefined && token !== null) {
      validateToken(token);
    }
  }, []);

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
              <button className='login-btn' onClick={() => doLogin()}>Login</button>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Login;
