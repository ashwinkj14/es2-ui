/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import axios from 'axios';

import SideBar from '../../SideBar/SideBar';

import './AddUser.css';

function AddUser({action}) {
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

  const handleAdd = () => {
    const api = `http://localhost:8080/user/add`;

    const data = {
      'userTypeId': selectedType,
      'username': username,
      'emailId': emailId,
      'organization': organization,
      'password': password,
    };

    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    axios.post(api, {
      withCredentials: true,
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
            Add User
    </div>
    <div className='add-user-body'>
      <div className="add-user-form">
        <div className='add-user-text-field-container'>
          <label>User Type</label>
          <select value={selectedType} onChange={handleTypeSelection} className="user-type-dropdown">
            <option value="1">Admin</option>
            <option value="2">Faculty</option>
            <option value="3">Member Company</option>
            <option value="4">Student</option>
          </select>
        </div>
        <div className='add-user-text-field-container'>
          <label>User Name</label>
          <input value={username} onChange={(event) => setUsername(event.target.value)} className="text-field" type="text"/>
        </div>
        <div className='add-user-text-field-container'>
          <label>Email ID</label>
          <input value={emailId} onChange={(event) => setEmailId(event.target.value)} className="text-field" type="text"/>
        </div>
        <div className='add-user-text-field-container'>
          <label>Organization</label>
          <input value={organization} onChange={(event) => setOrganization(event.target.value)} className="text-field" type="text"/>
        </div>
        <div className='add-user-text-field-container'>
          <label>Password</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} className="text-field" type="password"/>
        </div>
        <div className='add-user-text-field-container'>
          <label>Confirm Password</label>
          <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="text-field" type="password"/>
        </div>
      </div>
      <div className="add-user-submit-btn-container">
        <button className="add-user-submit-btn" onClick={handleAdd}>Submit</button>
      </div>
    </div>
  </div>;
  return (
    <SideBar content={toRender} closeAction={handleClose}/>
  );
}

export default AddUser;
