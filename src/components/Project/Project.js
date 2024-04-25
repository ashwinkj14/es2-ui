/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Footer from '../../containers/Footer/Footer';
import Header from '../../containers/Header/Header';

import Comments from './Comments/Comments';
import AddProject from './AddProject/AddProject';
import ManageProject from './ManageProject/ManageProject';
import ViewProject from './ViewProject/ViewProject';
import {useProjectGridStore} from '../../store/es2Store';

function Project() {
  const navigate = useNavigate();
  const commentsProjectId = useProjectGridStore((state) => state.commentsProjectId);
  const selectedTab = useProjectGridStore((state) => state.selectedTab);
  const setSelectedTab = useProjectGridStore((state) => state.setSelectedTab);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);


  const popup = (commentsProjectId=='')?'':<Comments/>;

  useEffect(() => {
    if (commentsProjectId === '') {
      document.body.classList.remove('modal-open');
    } else {
      document.body.classList.add('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [commentsProjectId]);


  const toRender = (selectedTab == 'search')?<ViewProject/>:
  (selectedTab == 'manage')?<ManageProject/>:
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
