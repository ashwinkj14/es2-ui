import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Action from './Action';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function DataGrid({data}) {
    
    const columnDefs = [
        { field: 'publicationId', headerName: 'Publication ID', hide:true},
        { field: 'type', headerName: 'Type'},
        { field: 'name', headerName: 'Name'},
        { field: 'status', headerName: 'Status'},
        { field: 'date', headerName: 'Date'},
        { field: 'authors', headerName: 'Author(s)'},
        { headerName: 'Action', cellRenderer: Action, width: 100},
    ];

    const defaultColDef = useMemo(() => {
        return {
          editable: false,
          sortable: true,
          flex: 1,
          minWidth: 100,
          filter: true,
          resizable: true,
          headerComponentParams: {
            menuIcon: 'fa-bars',
          },
        };
      }, []);
    
    if(data.length === 0){
        return(
            <div></div>
        );
    }

    return(
        <div className="ag-theme-alpine" style={{width: "90%", height: 500}}>
            <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}

export default DataGrid;
