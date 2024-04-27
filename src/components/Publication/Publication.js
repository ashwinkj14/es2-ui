/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {useState, useEffect, React} from 'react';
import {useNavigate} from 'react-router-dom';
import {usePublicationStore, useUserStore} from '../../store/es2Store';
import {usePublicationNavigation} from '../../store/es2Store';

import Search from '../Search/Search';
import DataGrid from './Grid/DataGrid';
import Abstract from './SideBar/Abstract';

import Footer from '../../containers/Footer/Footer';
import Header from '../../containers/Header/Header';
import AddPublication from './AddPublication/AddPublication';
import ManagePublication from './ManagePublication/ManagePublication';

import './Publication.css';

function Publication() {
  const navigate = useNavigate();
  const {selectedTab, setSelectedTab} = usePublicationNavigation((state) => state);
  const token = localStorage.getItem('token');
  if (token === undefined || token === null) {
    navigate('/');
  }
  const userTypeId = useUserStore((state) => state.userTypeId);
  const [popupContent, setPopupContent] = useState('');

  const setSearchResults = usePublicationStore((state) => state.setSearchResults);
  const renderNoData = usePublicationStore((state) => state.renderNoData);
  const setRenderNoData = usePublicationStore((state) => state.setRenderNoData);

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
        <div className="publication-title">Research Paper Repository</div>
      </section>
      <section className="publication-search-container">
        <Search/>
      </section>
      <section className="publication-data">
        <DataGrid popupContent={setPopupContent}/>
        {renderNoData}
      </section>
    </section>
  </>;

  const toRender = (selectedTab == 'search')?publicationBody:(selectedTab == 'manage')?
  (userTypeId == 2)?<></>:<ManagePublication/>:
  (userTypeId == 2)?<></>:<AddPublication/>;

  useEffect(() => {}, [selectedTab]);

  return (
    <div>
      <Header props={{page: 'publication'}} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {toRender}
      <Footer/>
    </div>
  );
}

export default Publication;
