/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Footer from '../../containers/Footer/Footer';
import Header from '../../containers/Header/Header';

import Comments from './Comments/Comments';
import AddProject from './AddProject/AddProject';
import ManageProject from './ManageProject/ManageProject';
import ViewProject from './ViewProject/ViewProject';

function Project() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('search');
  const [popupContent, setPopupContent] = useState('');
  const token = localStorage.getItem('token');
  if (token === undefined || token === null) {
    navigate('/');
  }

  const popup = (popupContent=='')?'':<Comments projectId={popupContent} action={setPopupContent}/>;
  if (popup == '') {
    document.body.classList.remove('modal-open');
  } else {
    document.body.classList.add('modal-open');
  }

  const toRender = (selectedTab == 'search')?<ViewProject setPopupContent={setPopupContent}/>:
  (selectedTab == 'manage')?<ManageProject setPopupContent={setPopupContent} setSelectedTab={setSelectedTab}/>:
  <AddProject setSelectedTab={setSelectedTab}/>;

  return (
    <div>
      <Header props={{page: 'project'}} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {popup}
      <div className={`${(popup=='')?'':'modal-overlay'}`}></div>
      {toRender}
      <Footer/>
    </div>
  );
}

export default Project;
