/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FAILURE, SUCCESS, displayToast} from '../../ToastUtil';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';

import SideBar from '../../SideBar/SideBar';

import './AddUser.css';
import {BASE_URL} from '../../../server-constants';

function AddUser({action}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userTypeOptions = [
    {
      value: '1',
      label: 'admin',
    },
    {
      value: '2',
      label: 'member company',
    },
    {
      value: '3',
      label: 'student',
    },
    {
      value: '4',
      label: 'faculty',
    },
  ];

  const navigate = useNavigate();
  const handleClose = () => action(false);

  const [selectedType, setSelectedType] = useState('1');
  const handleTypeSelection = (event) => {
    setSelectedType(event.target.value);
  };
  const [username, setUsername] = useState('');
  const [emailId, setEmailId] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const displayError = (Error) => {
    return (
      <section className='add-user-error-container'>{Error}</section>
    );
  };

  const handleValidation = () => {
    let errorExists = false;
    if (!username) {
      errorExists = true;
      setUsernameError('Username is required');
    }
    if (!emailId) {
      errorExists = true;
      setEmailIdError('Email ID is required');
    }
    if (!organization) {
      errorExists = true;
      setOrganizationError('Organization is required');
    }
    if (!password) {
      errorExists = true;
      setPasswordError('Password is required');
    }
    if (!confirmPassword) {
      errorExists = true;
      setConfirmPasswordError('Confirm Password is required');
    }
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})$/.test(password)) {
      const message = 'Password must contain at least:\n• 8 characters\n• one uppercase character\n• one lowercase character\n• a number\n• a symbol !@#$%^&*';
      displayToast(message, FAILURE);
      errorExists = true;
    }
    if (password!=confirmPassword) {
      displayToast('Password doesn\'t match.', FAILURE);
      errorExists = true;
    }
    return errorExists;
  };

  const handleAdd = () => {
    if (handleValidation()) {
      return;
    }
    const api = BASE_URL+`/user/add`;

    const data = {
      'userTypeId': selectedType,
      'username': username,
      'emailId': emailId,
      'organization': organization,
      'password': password,
    };

    const token = localStorage.getItem('token');
    axios.post(api, data, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
        .then((response) => {
          let status = FAILURE;
          if (response.status === 200) {
            if (response.data.result === 'success') {
              status = SUCCESS;
            }
          }
          const message = response.data.message;
          if (message) {
            displayToast(message, status);
          } else {
            const error = response.data.error;
            displayToast(error, status);
          }
          if (status === SUCCESS) {
            handleClose();
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          console.log(error);
        });
  };

  const toRender = <div>
    <div className="add-user-title">
            Add User
    </div>
    <div className='add-user-body-container'>
      <div className='add-user-body'>
        <div className="add-user-form">
          <Box
            component="form"
            sx={{
              '& > :not(style)': {m: 1, width: '32ch'},
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-usertype-select"
              select
              label="User Type"
              defaultValue="1"
              className="login-input"
              size="small"
              color='success'
              onChange={(event) => handleTypeSelection(event)}
              sx={{
                mb: 1,
                width: '30ch',
                fontSize: '0.9rem',
                fontWeight: 300,
              }}
              InputLabelProps={{
                sx: {
                  'fontSize': '0.9rem',
                  'fontWeight': 400,
                  '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
                },
              }}
            >
              {userTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-username"
              label="Username"
              defaultValue=""
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
            {displayError(usernameError)}
            <TextField
              id="outlined-username"
              label="Email ID"
              defaultValue=""
              className="login-input"
              size="small"
              color='success'
              sx={{
                mb: 1,
                width: '30ch',
                fontSize: '0.9rem',
                fontWeight: 300,
              }}
              value={emailId}
              onChange={(event) => setEmailId(event.target.value)}
              InputLabelProps={{
                sx: {
                  'fontSize': '0.9rem',
                  'fontWeight': 400,
                  '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
                },
              }}
            ></TextField>
            {displayError(emailIdError)}
            <TextField
              id="outlined-username"
              label="Organization"
              defaultValue=""
              className="login-input"
              size="small"
              color='success'
              sx={{
                mb: 1,
                width: '30ch',
                fontSize: '0.9rem',
                fontWeight: 300,
              }}
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              InputLabelProps={{
                sx: {
                  'fontSize': '0.9rem',
                  'fontWeight': 400,
                  '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
                },
              }}
            ></TextField>
            {displayError(organizationError)}
            <TextField
              id="outlined-password"
              label="Password"
              defaultValue="1"
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
            {displayError(passwordError)}
            <TextField
              id="outlined-confirm-password"
              label="Confirm Password"
              defaultValue="1"
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
            {displayError(confirmPasswordError)}
          </Box>
        </div>
        <div className="add-user-submit-btn-container">
          <button className="add-user-submit-btn" onClick={handleAdd}>Submit</button>
        </div>
      </div>
    </div>
  </div>;
  return (
    <SideBar content={toRender} closeAction={handleClose}/>
  );
}

export default AddUser;
