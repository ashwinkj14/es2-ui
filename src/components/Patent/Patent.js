/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {useState, React} from 'react';
import {useNavigate} from 'react-router-dom';
import {usePatentNavigation} from '../../store/es2Store';

import Search from './Search/Search';
import DataGrid from './Grid/DataGrid';
import Abstract from './SideBar/Abstract';

import Footer from '../../containers/Footer/Footer';
import Header from '../../containers/Header/Header';
import AddPatent from './AddPatent/AddPatent';
import ManagePatent from './ManagePatent/ManagePatent';

import './Patent.css';

function Patent() {
  const navigate = useNavigate();
  const {selectedTab, setSelectedTab} = usePatentNavigation((state) => state);
  const token = localStorage.getItem('token');
  if (token === undefined || token === null) {
    navigate('/');
  }
  const [searchResult, setSearchResult] = useState('');
  const [popupContent, setPopupContent] = useState('');

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
        <div className="publication-title">Patent Repository</div>
      </section>
      <section className="patent-search-container">
        <Search onSearch={handleSearch}/>
      </section>
      <section className="publication-data">
        <DataGrid data={searchResult} popupContent={setPopupContent}/>
      </section>
    </section>
  </>;

  const toRender = (selectedTab == 'search')?publicationBody:(selectedTab == 'manage')?<ManagePatent/>:<AddPatent/>;

  return (
    <div>
      <Header props={{page: 'patent'}} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {toRender}
      <Footer/>
    </div>
  );
}

export default Patent;
