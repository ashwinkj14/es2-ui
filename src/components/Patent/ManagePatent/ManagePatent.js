/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import DataGrid from '../Grid/DataGrid';
import Abstract from '../SideBar/Abstract';
import {useGridStore, usePatentStore} from '../../../store/es2Store';

import './ManagePatent.css';
import EditPatent from '../EditPatent/EditPatent';

function ManagePatent() {
  const gridRefresh = useGridStore((state) => state.gridRefresh);
  const listPatents = usePatentStore((state) => state.listPatents);
  const resetPatentStore = usePatentStore((state) => state.resetPatentStore);
  const renderNoData = usePatentStore((state) => state.renderNoData);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [popupContent, setPopupContent] = useState('');

  const popup = (popupContent=='')?'':<Abstract abstract={popupContent} action={setPopupContent}/>;
  if (popup == '') {
    document.body.classList.remove('modal-open');
  } else {
    document.body.classList.add('modal-open');
  }

  useEffect(() => {
    listPatents();
    return () => {
      resetPatentStore();
    };
  }, [gridRefresh]);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Patent</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid popupContent={setPopupContent} selectedTab="manage" setSelectedRecord={setSelectedRecord}/>
      {renderNoData}
    </section>
  </div>;

  const to_render = (selectedRecord==null)?data_page:<EditPatent data={selectedRecord} setSelectedRecord={setSelectedRecord}/>;
  return (
    <div>
      {to_render}
    </div>
  );
}

export default ManagePatent;
