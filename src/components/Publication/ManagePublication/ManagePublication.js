/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import DataGrid from '../Grid/DataGrid';
import Abstract from '../SideBar/Abstract';
import {usePublicationGridStore, usePublicationStore} from '../../../store/es2Store';

import './ManagePublication.css';
import EditPublication from '../EditPublication/EditPublication';

function ManagePublication() {
  const gridRefresh = usePublicationGridStore((state) => state.gridRefresh);
  const listPublications = usePublicationStore((state) => state.listPublications);
  const resetPublicationStore = usePublicationStore((state) => state.resetPublicationStore);
  const renderNoData = usePublicationStore((state) => state.renderNoData);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [popupContent, setPopupContent] = useState('');

  const popup = (popupContent=='')?'':<Abstract abstract={popupContent} action={setPopupContent}/>;
  if (popup == '') {
    document.body.classList.remove('modal-open');
  } else {
    document.body.classList.add('modal-open');
  }

  useEffect(() => {
    listPublications();
    return () => {
      resetPublicationStore();
    };
  }, [gridRefresh]);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Publications</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid popupContent={setPopupContent} selectedTab="manage" setSelectedRecord={setSelectedRecord}/>
      {renderNoData}
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
