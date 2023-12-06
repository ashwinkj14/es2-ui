/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import axios from 'axios';
import DataGrid from '../Grid/DataGrid';
import Abstract from '../SideBar/Abstract';
import {useNavigate} from 'react-router-dom';
import {usePublicationGridStore} from '../../../store/es2Store';
import {FAILURE, displayToast} from '../../ToastUtil';

import './ManagePublication.css';
import EditPublication from '../EditPublication/EditPublication';
import {BASE_URL} from '../../../server-constants';

function ManagePublication() {
  const navigate = useNavigate();
  const gridRefresh = usePublicationGridStore((state) => state.gridRefresh);
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
    const api = BASE_URL+`/publication/list`;
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
          if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          displayToast('Error occurred', FAILURE);
        });
  }, [gridRefresh]);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Publications</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid data={records} popupContent={setPopupContent} selectedTab="manage" setSelectedRecord={setSelectedRecord}/>
      {(records.length==0)?(<div className='no-data'>No Data Found</div>):<></>}
    </section>
  </div>;

  const to_render = (selectedRecord==null)?data_page:<EditPublication data={selectedRecord} setSelectedRecord={setSelectedRecord}/>;
  return (
    <div>
      {to_render}
    </div>
  );
}

export default ManagePublication;
