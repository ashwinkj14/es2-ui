/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import axios from 'axios';

import SideBar from '../../SideBar/SideBar';

import './EditUser.css';
import './AddUser.css';

function EditUser({action, user}) {
  const handleClose = () => action();
  const [selectedType, setSelectedType] = useState(user.userTypeId);
  const handleTypeSelection = (event) => {
    setSelectedType(event.target.value);
  };
  const [username, setUsername] = useState(user.userName);
  const [emailId, setEmailId] = useState(user.emailId);
  const [organization, setOrganization] = useState(user.organization);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const displayError = (Error) => {
    if (Error=='') {
      return (<></>);
    }
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
    if (password!=confirmPassword) {
      setConfirmPasswordError('Password doesn\'t match');
      setPasswordError('Password doesn\'t match');
    }
    return errorExists;
  };

  const handleUpdate = () => {
    if (handleValidation()) {
      return;
    }
    const api = `http://localhost:8080/user/update`;

    const data = {
      'userId': user.userId,
      'userTypeId': selectedType,
      'username': username,
      'emailId': emailId,
      'organization': organization,
      'password': password,
    };

    const token = localStorage.getItem('token');
    axios.post(api, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }, data)
        .then((response) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const toRender = <div>
    <div className="add-user-title">
            Edit User
    </div>
    <div className='add-user-body'>
      <div className="add-user-form">
        <div className='add-user-text-field-container'>
          <label>User Type</label>
          <select className="user-type-dropdown" value={selectedType} onChange={handleTypeSelection}>
            <option value="1">Admin</option>
            <option value="2">Faculty</option>
            <option value="3">Member Company</option>
            <option value="4">Student</option>
          </select>
        </div>
        <div className='add-user-field-container'>
          <div className='add-user-text-field-container'>
            <label>User Name</label>
            <input value={username} onChange={(event) => setUsername(event.target.value)} className="text-field" type="text"/>
          </div>
          {displayError(usernameError)}
        </div>
        <div className='add-user-field-container'>
          <div className='add-user-text-field-container'>
            <label>Email ID</label>
            <input value={emailId} onChange={(event) => setEmailId(event.target.value)} className="text-field" type="text"/>
          </div>
          {displayError(emailIdError)}
        </div>
        <div className='add-user-field-container'>
          <div className='add-user-text-field-container'>
            <label>Organization</label>
            <input value={organization} onChange={(event) => setOrganization(event.target.value)} className="text-field" type="text"/>
          </div>
          {displayError(organizationError)}
        </div>
        <div className='add-user-field-container'>
          <div className='add-user-text-field-container'>
            <label>Password</label>
            <input value={password} onChange={(event) => setPassword(event.target.value)} className="text-field" type="password"/>
          </div>
          {displayError(passwordError)}
        </div>
        <div className='add-user-field-container'>
          <div className='add-user-text-field-container'>
            <label>Confirm Password</label>
            <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="text-field" type="password"/>
          </div>
          {displayError(confirmPasswordError)}
        </div>
      </div>
      <div className="add-user-submit-btn-container">
        <button onClick={handleUpdate} className="add-user-submit-btn">Update</button>
      </div>
    </div>
  </div>;
  return (
    <SideBar content={toRender} closeAction={handleClose}/>
  );
}

export default EditUser;
