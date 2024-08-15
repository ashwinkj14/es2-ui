/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Footer from '../../containers/Footer/Footer';

import Comments from './Comments/Comments';
import AddProject from './AddProject/AddProject';
import ManageProject from './ManageProject/ManageProject';
import ViewProject from './ViewProject/ViewProject';
import {useProjectGridStore} from '../../store/es2Store';

function Project() {
  const navigate = useNavigate();
  const commentsProjectId = useProjectGridStore((state) => state.commentsProjectId);
  const selectedTab = useProjectGridStore((state) => state.selectedTab);
  const resetProjectStore = useProjectGridStore((state) => state.resetProjectStore);

  const token = localStorage.getItem('token');
  if (token === undefined || token === null) {
    navigate('/');
  }

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    return () => {
      resetProjectStore();
    };
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
                  <AddProject/>;

  return (
    <div>
      {popup}
      <div className={`${(popup=='')?'':'modal-overlay'}`}></div>
      {toRender}
      <Footer/>
    </div>
  );
}

export default Project;
