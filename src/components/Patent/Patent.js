/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {useState, useEffect, React} from 'react';
import {useNavigate} from 'react-router-dom';
import {usePatentNavigation, usePatentStore} from '../../store/es2Store';

import Search from './Search/Search';
import DataGrid from './Grid/DataGrid';
import Abstract from './SideBar/Abstract';

import Footer from '../../containers/Footer/Footer';
import AddPatent from './AddPatent/AddPatent';
import ManagePatent from './ManagePatent/ManagePatent';

import './Patent.css';

function Patent() {
  const navigate = useNavigate();
  const selectedTab = usePatentNavigation((state) => state.selectedTab);
  const token = localStorage.getItem('token');
  if (token === undefined || token === null) {
    navigate('/');
  }

  const [popupContent, setPopupContent] = useState('');

  const setSearchResults = usePatentStore((state) => state.setSearchResults);
  const renderNoData = usePatentStore((state) => state.renderNoData);
  const setRenderNoData = usePatentStore((state) => state.setRenderNoData);

  useEffect(() => {
    return () => {
      setSearchResults('');
      setRenderNoData(<></>);
    };
  }, [setRenderNoData, setSearchResults]);

  const popup = (popupContent=='')?'':<Abstract abstract={popupContent} action={setPopupContent}/>;
  if (popup == '') {
    document.body.classList.remove('modal-open');
  } else {
    document.body.classList.add('modal-open');
  }

  const publicationBody = <>
    {popup}
    <div className={`${(popup=='')?'':'modal-overlay'}`}></div>
    <section className="publication-container">
      <section className="publication-title-container">
        <div className="publication-title">Patent Repository</div>
      </section>
      <section className="patent-search-container">
        <Search/>
      </section>
      <section className="publication-data">
        <DataGrid popupContent={setPopupContent}/>
        {renderNoData}
      </section>
    </section>
  </>;

  const toRender = (selectedTab == 'search')?publicationBody:(selectedTab == 'manage')?<ManagePatent/>:<AddPatent/>;

  return (
    <div>
      {toRender}
      <Footer/>
    </div>
  );
}

export default Patent;
