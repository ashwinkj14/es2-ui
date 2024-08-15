/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import logo from '../../es2-logo-final.jpg';
import {BASE_URL} from '../../server-constants';
import {FAILURE, SUCCESS, displayToast} from '../ToastUtil';

import './forgotPassword.css';
import '../Login/Login.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const sendEmail = () => {
    if (email === '') {
      alert('Email field is required');
      return false;
    }
    const api = BASE_URL+'/api/auth/password/recovery';

    const requestData = {
      emailId: email,
    };

    axios.post(api, requestData).then((response) => {
      if (response.status === 200) {
        if (response.data.result === 'success') {
          const message = response.data.message;
          if (message) {
            displayToast(message, SUCCESS);
          }
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
          <div className='forgot-password-header'>Forgot Password</div>
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
                id="outlined-emailId"
                label="Email"
                className="login-input"
                size="small"
                color='success'
                sx={{
                  mb: 1,
                  width: '30ch',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                InputLabelProps={{
                  sx: {
                    'fontSize': '0.9rem',
                    'fontWeight': 400,
                    '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
                  },
                }}
              ></TextField>
            </Box>
            <section className='login-btn-container'>
              <button className='login-btn' onClick={() => sendEmail()}>Submit</button>
            </section>
            <section className='login-btn-container'>
              <div className='back-to-login-btn' onClick={() => navigate('/')}>Back to Login</div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
