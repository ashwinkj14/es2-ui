/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import TablePagination from '@mui/material/TablePagination';

import {FAILURE, SUCCESS, displayToast} from '../../ToastUtil';
import {useGridStore, usePresentationGridStore, useProjectGridStore} from '../../../store/es2Store';
import CustomCellRenderer from './CustomCellRenderer';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Action.css';
import './DataGrid.css';
import httpClient from '../../../helper/httpClient';

function DataGrid() {
  const selectedTab = useProjectGridStore((state) => state.selectedTab);
  const setSelectedRecord = useProjectGridStore((state) => state.setSelectedRecord);
  const currentPage = useProjectGridStore((state) => state.currentPage);
  const setCurrentPage = useProjectGridStore((state) => state.setCurrentPage);
  const pageSize = useProjectGridStore((state) => state.pageSize);
  const setPageSize = useProjectGridStore((state) => state.setPageSize);
  const projectList = useProjectGridStore((state) => state.projectList);
  const getProjectList = useProjectGridStore((state) => state.getProjectList);
  const getUserProjects = useProjectGridStore((state) => state.getUserProjects);
  const setCommentsProjectId = useProjectGridStore((state) => state.setCommentsProjectId);

  const setGridRefresh = useGridStore((state) => state.setGridRefresh);

  const setPresentationRequest = usePresentationGridStore((state) => state.setPresentationRequest);

  const handleEdit = (props) => {
    setSelectedRecord(props.node.data);
  };

  const deleteProject = async (projectId) => {
    try {
      const requestData = {
        projectId: projectId,
      };
      const response = await httpClient.post(`/api/project/delete`, requestData);

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
      displayToast('Unable to delete project.', FAILURE);
    }
  };

  const handleDelete = (props) => {
    const projectId = props.node.data.project_id;
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  const handleCommentsButtonClick = (props) => {
    const projectId = props.node.data.project_id;
    setCommentsProjectId(projectId);
  };

  const commentsAction = (props) =>
    <div className="download-pub-btn">
      <div onClick={() => handleCommentsButtonClick(props)}>
        <svg className="view-abstract-btn-img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 10h12v1H6zM3 1h12.29L21 6.709V23H3zm12 6h5v-.2L15.2 2H15zM4 22h16V8h-6V2H4zm2-7h12v-1H6zm0 4h9v-1H6z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
      </div>
    </div>;

  const openPresentations = (props) => {
    const projectId = props.node.data.project_id;
    const requestData = {
      project_id: projectId,
    };
    setPresentationRequest(requestData);
  };

  const presentationAction = (props) =>
    <div className="abstract-pub-btn action-btn">
      <svg onClick={() => openPresentations(props)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"/>
      </svg>
    </div>;

  const manageProjectAction = (props) =>
    <div className="user-action-container">
      <div className='edit-user-btn-container' onClick={() => handleEdit(props)}>
        <svg className='edit-user-btn' viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="45.56 46.83 45.56 56.26 7.94 56.26 7.94 20.6 19.9 7.74 45.56 7.74 45.56 21.29"></polyline><polyline points="19.92 7.74 19.9 20.6 7.94 20.6"></polyline><line x1="13.09" y1="47.67" x2="31.1" y2="47.67"></line><line x1="13.09" y1="41.14" x2="29.1" y2="41.14"></line><line x1="13.09" y1="35.04" x2="33.1" y2="35.04"></line><line x1="13.09" y1="28.94" x2="39.1" y2="28.94"></line><path d="M34.45,43.23l.15,4.3a.49.49,0,0,0,.62.46l4.13-1.11a.54.54,0,0,0,.34-.23L57.76,22.21a1.23,1.23,0,0,0-.26-1.72l-3.14-2.34a1.22,1.22,0,0,0-1.72.26L34.57,42.84A.67.67,0,0,0,34.45,43.23Z"></path><line x1="50.2" y1="21.7" x2="55.27" y2="25.57"></line></g></svg>
      </div>
      <div className='delete-user-btn-container'>
        <span onClick={() => handleDelete(props)} className='delete-user-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 60 60" viewBox="0 0 60 60" id="delete"><path d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1
h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2
c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6
h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z"></path><path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z"></path></svg>
        </span>
      </div>
    </div>;

  const columnDefs = [
    {field: 'project_id', headerName: 'Project ID', hide: true, width: 0},
    {field: 'pi_students_list', headerName: 'Students List', hide: true, width: 0},
    {field: 'iab_mentors_list', headerName: 'Mentors List', hide: true, width: 0},
    {field: 'project_title', headerName: 'Title', cellRenderer: CustomCellRenderer, autoHeight: true, minWidth: 250},
    {field: 'pi_students', headerName: 'PI and Student(s)', cellRenderer: CustomCellRenderer, autoHeight: true, minWidth: 150},
    {field: 'iab_mentors', headerName: 'IAB Mentor(s)', cellRenderer: CustomCellRenderer, autoHeight: true, minWidth: 150},
    {headerName: 'Presentations', cellRenderer: presentationAction, minWidth: 100},
    (selectedTab=='manage')?{hide: true}:{headerName: 'Comments/Response', cellRenderer: commentsAction, minWidth: 100},
    (selectedTab=='manage')?{headerName: 'Action', cellRenderer: manageProjectAction, minWidth: 50}:{hide: true},
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

  if (Object.keys(projectList).length === 0 || projectList.data.length === 0) {
    return (
      <div></div>
    );
  }

  const pagination = false;
  const rowCount = (projectList.totalRecords)?projectList.totalRecords:0;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage+1);
    if (selectedTab=='search') {
      getProjectList();
    } else {
      getUserProjects();
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
    if (selectedTab=='search') {
      getProjectList();
    } else {
      getUserProjects();
    }
  };

  return (
    <div className="ag-theme-alpine" style={{width: '95%', height: '100'}}>
      <AgGridReact
        rowData={projectList.data}
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

export default DataGrid;
