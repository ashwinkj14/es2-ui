/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import logo from '../../es2-logo-final.jpg';
import {BASE_URL} from '../../server-constants';
import {useUserStore} from '../../store/es2Store';
import {FAILURE, displayToast} from '../ToastUtil';

import './Login.css';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const setUserTypeId = useUserStore((state) => state.setUserTypeId);
  const doLogin = () => {
    if (username === '') {
      alert('username is required');
      return false;
    }
    if (password === '') {
      alert('password is required');
      return false;
    }

    const api = BASE_URL+'/api/auth/login';

    const requestData = {
      username: username,
      password: password,
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
      if (error.code === 'ERR_NETWORK') {
        displayToast('Unable to connect to the server', FAILURE);
      } else {
        displayToast('Error occurred', FAILURE);
      }
    });
  };

  const validateToken = (token) => {
    const api = BASE_URL+'/api/auth/login';

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
          <div className='login-header'>ES2 Repository</div>
          <section className='login-input-container'>
            <Box
              component="form"
              sx={{
                '& > :not(style)': {m: 1, width: '32ch'},
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-username"
                label="Username"
                className="login-input"
                size="small"
                color='success'
                sx={{
                  mb: 1,
                  width: '30ch',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                }}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                InputLabelProps={{
                  sx: {
                    'fontSize': '0.9rem',
                    'fontWeight': 400,
                    '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
                  },
                }}
              ></TextField>
              <TextField
                id="outlined-password"
                label="Password"
                className="login-input"
                size="small"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  mb: 1,
                  width: '30ch',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                }}
                color='success'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                InputLabelProps={{
                  sx: {
                    'fontSize': '0.9rem',
                    'fontWeight': 400,
                    '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
                  },
                }}
                InputProps={{
                  endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                }}
              >
              </TextField>
            </Box>
            <section className='login-btn-container'>
              <button className='login-btn' onClick={() => doLogin()}>Login</button>
            </section>
            <section className='login-forgot-password'>
              <div onClick={() => navigate('/ForgotPassword')}>forgot password?</div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Login;
