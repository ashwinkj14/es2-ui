/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {useMemo} from 'react';
import axios from 'axios';
import {AgGridReact} from 'ag-grid-react';
import CustomCellRenderer from './CustomCellRenderer';
import {useNavigate} from 'react-router-dom';
import {FAILURE, SUCCESS, displayToast} from '../../ToastUtil';
import {usePublicationGridStore} from '../../../store/es2Store';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Action.css';
import './DataGrid.css';
import {BASE_URL} from '../../../server-constants';

function DataGrid({data, popupContent, selectedTab, setSelectedRecord}) {
  const navigate = useNavigate();
  const setGridRefresh = usePublicationGridStore((state) => state.setGridRefresh);

  const downloadPublication = async (publicationId) => {
    const api = BASE_URL+`/publication/download`;

    const token = localStorage.getItem('token');
    const requestData = {
      publication_id: publicationId,
    };
    axios.get(api, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      params: requestData,
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
          } else {
            displayToast('Unable to Download the file', FAILURE);
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          displayToast('Unable to Download the file', FAILURE);
        });
  };

  const handleAbstractButtonClick = (props) => {
    const abstract = props.node.data.abstract;
    popupContent(abstract);
  };

  const handleDownloadButtonClick = (props) => {
    const publicationId = props.node.data.id;
    downloadPublication(publicationId);
  };

  const handleEdit = (props) => {
    setSelectedRecord(props.node.data);
  };

  const deletePublication = async (publicationId) => {
    const api = BASE_URL+`/publication/delete`;
    try {
      const requestData = {
        publication_id: publicationId,
      };
      const token = localStorage.getItem('token');
      const response = await axios.post(api, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

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
      if (error.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      console.error(error);
      displayToast('Error occurred', FAILURE);
    }
  };

  const handleDelete = (props) => {
    const publicationId = props.node.data.publicationId;
    if (window.confirm('Are you sure you want to delete this publication record?')) {
      deletePublication(publicationId);
    }
  };

  const Action = (props) =>
    <div className="download-pub-btn">
      <div onClick={() => handleAbstractButtonClick(props)}>
        <svg className="view-abstract-btn-img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 10h12v1H6zM3 1h12.29L21 6.709V23H3zm12 6h5v-.2L15.2 2H15zM4 22h16V8h-6V2H4zm2-7h12v-1H6zm0 4h9v-1H6z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
      </div>
      <div onClick={() => handleDownloadButtonClick(props)}>
        <svg className="download-btn-img" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20,6.52797748 L20,19.5 C20,20.8807119 18.8807119,22 17.5,22 L6.5,22 C5.11928813,22 4,20.8807119 4,19.5 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L15.4720225,2 C15.6047688,1.99158053 15.7429463,2.03583949 15.8535534,2.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 Z M15,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L17.5,21 C18.3284271,21 19,20.3284271 19,19.5 L19,7 L15.5,7 C15.2238576,7 15,6.77614237 15,6.5 L15,3 Z M16,3.70710678 L16,6 L18.2928932,6 L16,3.70710678 Z M12,16.2928932 L14.1464466,14.1464466 C14.3417088,13.9511845 14.6582912,13.9511845 14.8535534,14.1464466 C15.0488155,14.3417088 15.0488155,14.6582912 14.8535534,14.8535534 L11.9198269,17.7872799 C11.8307203,17.9246987 11.6759769,18.0156098 11.5,18.0156098 C11.3240231,18.0156098 11.1692797,17.9246987 11.0801731,17.7872799 L8.14644661,14.8535534 C7.95118446,14.6582912 7.95118446,14.3417088 8.14644661,14.1464466 C8.34170876,13.9511845 8.65829124,13.9511845 8.85355339,14.1464466 L11,16.2928932 L11,9.5 C11,9.22385763 11.2238576,9 11.5,9 C11.7761424,9 12,9.22385763 12,9.5 L12,16.2928932 L12,16.2928932 Z"></path> </g></svg>
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
    {field: 'mode', headerName: 'Mode', hide: true, width: 0},
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
