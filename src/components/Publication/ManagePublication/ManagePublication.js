/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import axios from 'axios';
import DataGrid from '../Grid/DataGrid';
import Abstract from '../SideBar/Abstract';

import './ManagePublication.css';
import EditPublication from '../EditPublication/EditPublication';

function ManagePublication() {
  const [records, setRecords] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [popupContent, setPopupContent] = useState('');

  const popup = (popupContent=='')?'':<Abstract abstract={popupContent} action={setPopupContent}/>;
  if (popup == '') {
    document.body.classList.remove('modal-open');
  } else {
    document.body.classList.add('modal-open');
  }

  useEffect(() => {
    const api = `http://localhost:8080/publication/list`;
    const token = localStorage.getItem('token');

    axios.get(api, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
        .then((response) => {
          const result = response.data;
          setRecords(result.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  }, []);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Publications</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid data={records} popupContent={setPopupContent} selectedTab="manage" setSelectedRecord={setSelectedRecord}/>
    </section>
  </div>;

  const to_render = (selectedRecord==null)?(records.length>0)?data_page:(<div className='no-data'>No data found</div>):<EditPublication data={selectedRecord} setSelectedRecord={setSelectedRecord}/>;
  return (
    <div>
      {to_render}
    </div>
  );
}

export default ManagePublication;
