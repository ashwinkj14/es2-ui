/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import UserGrid from './Grid/UserGrid';
import './UserManagement.css';

function UserMgmt({setModalState, setUserDetails, editUserAction, shouldRender}) {
  const handleAddUser = () => {
    setModalState(true);
  };
  return (
    <div className='usermgmt-main-container'>
      <div className='usermgmt-header-container'>
        <div className='usermgmt-header'>
          <h1 className='usermgmt-header-content'>User Management</h1>
          <div className='usermgmt-add-user-btn' onClick={handleAddUser}>Add User</div>
        </div>
        {/* <hr className='line-break-sm'></hr> */}
      </div>
      <div className='usermgmt-grid-container'>
        <UserGrid setUserDetails={setUserDetails} editUserAction={editUserAction} shouldRender={shouldRender}/>
      </div>
    </div>
  );
}

export default UserMgmt;
