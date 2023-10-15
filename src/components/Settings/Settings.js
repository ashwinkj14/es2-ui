/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';

import UserMgmt from '../User/UserManagement';
import AddUser from '../User/Operations/AddUser';
import EditUser from '../User/Operations/EditUser';

import DatabaseSettings from '../Database/DatabaseSettings';

import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';

import './Settings.css';

function Settings() {
  const [selectedTab, setSelectedTab] = useState('usermgmt');
  const [userDetails, setUserDetails] = useState({});
  const [shouldRender, setShouldRender] = useState(false);

  const handleSettingsTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const modalChangeHandler = (state) =>{
    setIsModalOpen(state);
    setShouldRender(!shouldRender);
  };

  const handleEditUserClose = () => {
    setUserDetails({});
    modalChangeHandler(false);
    setIsEditUserOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  const popup = (isModalOpen)?<AddUser action={modalChangeHandler}/>:'';
  const editUserPopup = (isEditUserOpen)?<EditUser action={handleEditUserClose} user={userDetails}/>:'';
  return (
    <div>
      <Header props={{page: 'settings', onTabChange: handleSettingsTabChange}}/>
      {popup}
      {editUserPopup}
      <div className={`${(popup=='' && editUserPopup=='')?'':'modal-overlay'}`}></div>
      <div className={`${selectedTab == 'usermgmt'?'usermgmt-container':'default-container'}`}>
        <UserMgmt setModalState={setIsModalOpen} setUserDetails={setUserDetails} editUserAction={setIsEditUserOpen} shouldRender={shouldRender}/>
      </div>
      <div className={`${selectedTab == 'dbsettings'?'database-settings-container':'default-container'}`}>
        <DatabaseSettings/>
      </div>
      <Footer/>
      {/* User and backup goes here */}
    </div>
  );
}

export default Settings;