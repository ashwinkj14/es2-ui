/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {useState, React} from 'react';

import Search from '../Search/Search';
import DataGrid from './Grid/DataGrid';
import Abstract from './SideBar/Abstract';

import Footer from '../../containers/Footer/Footer';
import Header from '../../containers/Header/Header';
import AddPublication from './AddPublication/AddPublication';

import './Publication.css';

function Publication() {
  const token = localStorage.getItem('token');
  if (token === undefined || token === null) {
    window.location.href = '/';
    return (
      <div></div>
    );
  }
  const [searchResult, setSearchResult] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [selectedTab, setSelectedTab] = useState('search');

  const handleSearch = (data) => {
    setSearchResult(data);
  };

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
        <Search onSearch={handleSearch}/>
      </section>
      <section className="publication-data">
        <DataGrid data={searchResult} popupContent={setPopupContent}/>
      </section>
    </section>
  </>;

  const manage = <></>;

  const toRender = (selectedTab == 'search')?publicationBody:(selectedTab == 'manage')?manage:<AddPublication/>;

  return (
    <div>
      <Header props={{page: 'publication'}} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {toRender}
      <Footer/>
    </div>
  );
}

export default Publication;
