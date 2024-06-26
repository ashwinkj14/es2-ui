/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useEffect, useMemo} from 'react';
import {useUserStore} from '../../../store/es2Store';
import {AgGridReact} from 'ag-grid-react';
import TablePagination from '@mui/material/TablePagination';
import CustomCellRenderer from '../../Publication/Grid/CustomCellRenderer';
import {FAILURE, SUCCESS, displayToast} from '../../ToastUtil';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../Publication/Grid/DataGrid.css';
import httpClient from '../../../helper/httpClient';

// Add a information icon near organization name and on hover display that
// "Organization Name" can be your company name or the university name.

// Check where we can add the add user button only for admin anyway.
function UserGrid({setUserDetails, editUserAction}) {
  const userTypeId = useUserStore((state) => state.userTypeId);
  const userList = useUserStore((state) => state.userList);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const currentPage = useUserStore((state) => state.currentPage);
  const setCurrentPage = useUserStore((state) => state.setCurrentPage);
  const pageSize = useUserStore((state) => state.pageSize);
  const setPageSize = useUserStore((state) => state.setPageSize);
  const gridRefresh = useUserStore((state) => state.gridRefresh);
  const setGridRefresh = useUserStore((state) => state.setGridRefresh);
  const resetUserStore = useUserStore((state) => state.resetUserStore);

  const handleUserEdit = (props) => {
    const userDetails = {
      userId: props.node.data.userId,
      userName: props.node.data.username,
      emailId: props.node.data.emailId,
      organization: props.node.data.organization,
      userType: props.node.data.userType,
      userTypeId: props.node.data.userTypeId,
    };
    setUserDetails(userDetails);
    editUserAction(true);
  };

  useEffect(() => {
    fetchUserData();
    return () => {
      resetUserStore();
    };
  }, [gridRefresh]);

  const handleDelete = async (props) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    const data = {
      'userId': props.node.data.userId,
    };

    try {
      const response = await httpClient.post(`/api/user/delete`, data);
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
        setGridRefresh();
      }
    } catch (error) {
      console.error(error);
      displayToast('Unable to delete the user.', FAILURE);
    };
  };

  const userAction = (props) =>
    <div className="user-action-container">
      <div className='edit-user-btn-container' onClick={() => handleUserEdit(props)}>
        <svg className='edit-user-btn' viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="45.56 46.83 45.56 56.26 7.94 56.26 7.94 20.6 19.9 7.74 45.56 7.74 45.56 21.29"></polyline><polyline points="19.92 7.74 19.9 20.6 7.94 20.6"></polyline><line x1="13.09" y1="47.67" x2="31.1" y2="47.67"></line><line x1="13.09" y1="41.14" x2="29.1" y2="41.14"></line><line x1="13.09" y1="35.04" x2="33.1" y2="35.04"></line><line x1="13.09" y1="28.94" x2="39.1" y2="28.94"></line><path d="M34.45,43.23l.15,4.3a.49.49,0,0,0,.62.46l4.13-1.11a.54.54,0,0,0,.34-.23L57.76,22.21a1.23,1.23,0,0,0-.26-1.72l-3.14-2.34a1.22,1.22,0,0,0-1.72.26L34.57,42.84A.67.67,0,0,0,34.45,43.23Z"></path><line x1="50.2" y1="21.7" x2="55.27" y2="25.57"></line></g></svg>
      </div>
      {(userTypeId != 1)?<></>:<div className='delete-user-btn-container'>
        <span onClick={() => handleDelete(props)} className='delete-user-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 60 60" viewBox="0 0 60 60" id="delete"><path d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1
	h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2
	c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6
	h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z"></path><path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z"></path></svg>
        </span>
      </div>}
    </div>;

  const columnDefs = [
    {field: 'userId', headerName: 'User ID', hide: true, width: 0},
    {field: 'userTypeId', headerName: 'UserType ID', hide: true, width: 0},
    {field: 'username', headerName: 'User Name', cellRenderer: CustomCellRenderer, minWidth: 200},
    {field: 'emailId', headerName: 'Email ID', autoHeight: true, cellRenderer: CustomCellRenderer, minWidth: 300},
    {field: 'userType', headerName: 'User Type', cellRenderer: CustomCellRenderer, minWidth: 200},
    {field: 'organization', headerName: 'Organization', cellRenderer: CustomCellRenderer, minWidth: 300},
    {headerName: 'Action', cellRenderer: userAction, minWidth: 120},
  ];

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: false,
      flex: 1,
      filter: false,
      resizable: true,
      headerComponentParams: {
        menuIcon: 'fa-bars',
      },
    };
  }, []);

  if (Object.keys(userList).length === 0 || userList.data.length === 0) {
    return (
      <div></div>
    );
  }

  const pagination = false;
  const rowCount = (userList.totalRecords)?userList.totalRecords:0;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage+1);
    fetchUserData();
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
    fetchUserData();
  };

  return (
    <div className="ag-theme-alpine" style={{width: '100%', height: '100'}}>
      <AgGridReact
        rowData={userList.data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={pageSize}
        rowHeight="auto"
        domLayout='autoHeight'
      />
      <TablePagination
        component="div"
        count={rowCount}
        page={currentPage-1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={true}
        showLastButton={true}
      />
    </div>
  );
}

export default UserGrid;
