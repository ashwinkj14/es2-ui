/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {useMemo, useState} from 'react';
import axios from 'axios';
import {AgGridReact} from 'ag-grid-react';
import CustomCellRenderer from './CustomCellRenderer';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Action.css';
import './DataGrid.css';

function DataGrid({data, popupContent, selectedTab, setSelectedRecord}) {
  const [refresh, setRefresh] = useState(false);
  const downloadPublication = async (publicationId) => {
    const api = `http://localhost:8080/publication/download?id=` + publicationId;

    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    axios.get(api, {
      withCredentials: true,
      responseType: 'blob',
    })
        .then(async (response) => {
          if (response.status === 200) {
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers.get('content-disposition');
            link.download = publicationId + '.pdf';
            if (contentDisposition != undefined) {
              link.download = contentDisposition.split('filename=')[1];
            }
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            console.log('File Downloaded Successfully');
          } else {
            console.error('Error Downloading PDF');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          if (error.response.status == 401) {
            window.location.href = '/';
          }
        });
  };

  const handleAbstractButtonClick = (props) => {
    const abstract = props.node.data.abstract;
    popupContent(abstract);
  };

  const handleDownloadButtonClick = (props) => {
    const publicationId = props.node.data.publicationId;
    downloadPublication(publicationId);
  };

  const handleEdit = (props) => {
    console.log(props.node.data);
    setSelectedRecord(props.node.data);
  };

  const deletePublication = async (publicationId) => {
    const api = `http://localhost:8080/publication/delete`;
    try {
      const requestData = {
        id: publicationId,
      };
      const token = localStorage.getItem('token');
      const response = await axios.post(api, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (response.status === 200) {
        if (response.result === 'success') {
          setRefresh(!refresh);
          console.log('Publication deleted successfully.');
        } else {
          console.error('Publication was not deleted.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (props) => {
    const publicationId = props.node.data.publicationId;
    deletePublication(publicationId);
  };

  const Action = (props) =>
    <div className="download-pub-btn">
      <div onClick={() => handleAbstractButtonClick(props)}>
        <svg className="view-abstract-btn-img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.2686 16.2686L15 18M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M14 14.5C14 15.8807 12.8807 17 11.5 17C10.1193 17 9 15.8807 9 14.5C9 13.1193 10.1193 12 11.5 12C12.8807 12 14 13.1193 14 14.5Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </div>
      <div onClick={() => handleDownloadButtonClick(props)}>
        <svg className="download-btn-img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </div>
    </div>;

  const managePublicationAction = (props) =>
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
    {field: 'publicationId', headerName: 'Publication ID', hide: true, width: 0},
    {field: 'abstract', headerName: 'Abstract', hide: true, width: 0},
    {field: 'es2_project_number', headerName: 'ES2 Project Number', hide: true, width: 0},
    {field: 'isCopyrighted', headerName: 'Is Copyrighted', hide: true, width: 0},
    {field: 'keywords', headerName: 'Keywords', hide: true, width: 0},
    {field: 'authors_list', headerName: 'Authors List', hide: true, width: 0},
    {field: 'name', headerName: 'Name', autoHeight: true, cellRenderer: CustomCellRenderer, minWidth: 500},
    {field: 'type', headerName: 'Type', cellRenderer: CustomCellRenderer, minWidth: 100},
    {field: 'status', headerName: 'Status', cellRenderer: CustomCellRenderer, minWidth: 100},
    {field: 'date', headerName: 'Date', cellRenderer: CustomCellRenderer, minWidth: 150},
    {field: 'authors', headerName: 'Author(s)', autoHeight: true, cellRenderer: CustomCellRenderer, minWidth: 300},
    {headerName: 'Action', cellRenderer: (selectedTab=='manage')?managePublicationAction:Action, minWidth: 120},
  ];

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      headerComponentParams: {
        menuIcon: 'fa-bars',
      },
    };
  }, []);

  if (data.length === 0) {
    return (
      <div></div>
    );
  }

  const pagination = true;
  const paginationPageSize = 10;

  return (
    <div className="ag-theme-alpine" style={{width: '95%', height: '100'}}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        rowHeight="auto"
        domLayout='autoHeight'
      />
    </div>
  );
}

export default DataGrid;
