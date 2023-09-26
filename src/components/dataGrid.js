/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import Action from './Action';
import CustomCellRenderer from './CustomCellRenderer';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/DataGrid.css';

function DataGrid({data}) {
  const columnDefs = [
    {field: 'publicationId', headerName: 'Publication ID', hide: true, width: 0},
    {field: 'type', headerName: 'Type', cellRenderer: CustomCellRenderer, minWidth: 100},
    {field: 'name', headerName: 'Name', autoHeight: true, cellRenderer: CustomCellRenderer, minWidth: 500},
    {field: 'status', headerName: 'Status', cellRenderer: CustomCellRenderer, minWidth: 100},
    {field: 'date', headerName: 'Date', cellRenderer: CustomCellRenderer, minWidth: 120},
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
