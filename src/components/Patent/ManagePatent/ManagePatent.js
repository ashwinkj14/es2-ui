/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import axios from 'axios';
import DataGrid from '../Grid/DataGrid';
import Abstract from '../SideBar/Abstract';
import {useNavigate} from 'react-router-dom';
import {useGridStore} from '../../../store/es2Store';

import './ManagePatent.css';
import EditPatent from '../EditPatent/EditPatent';
import {BASE_URL} from '../../../server-constants';

function ManagePatent() {
  const navigate = useNavigate();
  const gridRefresh = useGridStore((state) => state.gridRefresh);

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
    const api = BASE_URL+`/patent/list`;
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
          if (error.code === 'ERR_NETWORK') {
            console.log(error.message);
          } else if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          console.error('Error fetching data:', error);
        });
  }, [gridRefresh]);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Patent</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid data={records} popupContent={setPopupContent} selectedTab="manage" setSelectedRecord={setSelectedRecord}/>
    </section>
  </div>;

  const to_render = (selectedRecord==null)?(records.length>0)?data_page:(<div className='no-data'>No data found</div>):<EditPatent data={selectedRecord} setSelectedRecord={setSelectedRecord}/>;
  return (
    <div>
      {to_render}
    </div>
  );
}

export default ManagePatent;
