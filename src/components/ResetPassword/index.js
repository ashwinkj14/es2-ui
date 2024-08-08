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
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import logo from '../../es2-logo-final.jpg';
import {BASE_URL} from '../../server-constants';
import {FAILURE, SUCCESS, displayToast} from '../ToastUtil';

import './resetPassword.css';
import '../Login/Login.css';
import NotFound from '../404/NotFound';

function ResetPassword() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  if (!token || token.length !== 64) {
    return <NotFound/>;
  }
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const doResetPassword = () => {
    if (password === '') {
      alert('Password field is required');
      return false;
    }
    if (confirmPassword === '') {
      alert('Confirm Password field is required');
      return false;
    }
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})$/.test(password)) {
      const message = 'Password must contain at least:\n• 8 characters\n• one uppercase character\n• one lowercase character\n• a number\n• a symbol !@#$%^&*';
      displayToast(message, FAILURE);
      return false;
    }
    if (password!=confirmPassword) {
      displayToast('Password doesn\'t match.', FAILURE);
      return false;
    }
    const api = BASE_URL+'/api/auth/password/reset';

    const requestData = {
      password: password,
      token: token,
    };

    axios.post(api, requestData).then((response) => {
      if (response.status === 200) {
        if (response.data.result === 'success') {
          const message = response.data.message;
          if (message) {
            displayToast(message, SUCCESS);
          }
          navigate('/');
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

  return (
    <div className='login-body'>
      <section className='banner'>
        <div>
          <img src={logo} alt='ES2'/>
        </div>
      </section>

      <section className='login-section'>
        <div className='login-container'>
          <div className='forgot-password-header'>Reset Password</div>
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
                id="outlined-password"
                label="Password"
                defaultValue=""
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
              <TextField
                id="outlined-confirm-password"
                label="Confirm Password"
                defaultValue=""
                className="login-input"
                size="small"
                type={showConfirmPassword ? 'text' : 'password'}
                sx={{
                  mb: 1,
                  width: '30ch',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                }}
                color='success'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                }}
              >
              </TextField>
            </Box>
            <section className='login-btn-container'>
              <button className='login-btn' onClick={() => doResetPassword()}>Submit</button>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
