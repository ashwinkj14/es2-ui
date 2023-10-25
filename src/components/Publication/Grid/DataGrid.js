/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {useMemo} from 'react';
import axios from 'axios';
import {AgGridReact} from 'ag-grid-react';
import CustomCellRenderer from './CustomCellRenderer';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Action.css';
import './DataGrid.css';

function DataGrid({data, popupContent}) {
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
          console.log('Error fetching data:', error);
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

  const Action = (props) =>
    <div className="download-pub-btn">
      <div onClick={() => handleAbstractButtonClick(props)}>
        <svg className="view-abstract-btn-img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.2686 16.2686L15 18M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M14 14.5C14 15.8807 12.8807 17 11.5 17C10.1193 17 9 15.8807 9 14.5C9 13.1193 10.1193 12 11.5 12C12.8807 12 14 13.1193 14 14.5Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </div>
      <div onClick={() => handleDownloadButtonClick(props)}>
        <svg className="download-btn-img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </div>
    </div>;

  const columnDefs = [
    {field: 'publicationId', headerName: 'Publication ID', hide: true, width: 0},
    {field: 'abstract', headerName: 'Abstract', hide: true, width: 0},
    {field: 'name', headerName: 'Name', autoHeight: true, cellRenderer: CustomCellRenderer, minWidth: 500},
    {field: 'type', headerName: 'Type', cellRenderer: CustomCellRenderer, minWidth: 100},
    {field: 'status', headerName: 'Status', cellRenderer: CustomCellRenderer, minWidth: 100},
    {field: 'date', headerName: 'Date', cellRenderer: CustomCellRenderer, minWidth: 150},
    {field: 'authors', headerName: 'Author(s)', autoHeight: true, cellRenderer: CustomCellRenderer, minWidth: 300},
    {headerName: 'Action', cellRenderer: Action, minWidth: 120},
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
