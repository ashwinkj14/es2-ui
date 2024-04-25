/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';
import axios from 'axios';
import DataGrid from '../Grid/DataGrid';
import {useNavigate} from 'react-router-dom';
import {useGridStore, usePresentationGridStore, useProjectGridStore} from '../../../store/es2Store';

import './ManageProject.css';
import EditProject from '../EditProject/EditProject';
import {BASE_URL} from '../../../server-constants';
import ManagePresentation from '../../Presentation/ManagePresentation/ManagePresentation';
import AddPresentation from '../../Presentation/AddPresentation/AddPresentation';

function ManageProject() {
  const navigate = useNavigate();
  const gridRefresh = useGridStore((state) => state.gridRefresh);

  const projectList = useProjectGridStore((state) => state.projectList);
  const setProjectList = useProjectGridStore((state) => state.setProjectList);
  const selectedRecord = useProjectGridStore((state) => state.selectedRecord);

  const presentationRequest = usePresentationGridStore((state) => state.presentationRequest);
  const isAddPresentation = usePresentationGridStore((state) => state.isAddPresentation);


  const onLoad = () => {
    const api = BASE_URL+`/project/manage`;
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
          const data = result.data;
          setProjectList(data);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          console.log('Error fetching data:', error);
        });
  };

  useEffect(() => {
    onLoad();
  }, [gridRefresh]);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Project</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid/>
      {(projectList.length==0)?(<div className='no-data'>No Data Found</div>):<></>}
    </section>
  </div>;

  const to_render = (selectedRecord==null)?
                        (presentationRequest == null)?data_page:
                              (isAddPresentation == true)?<AddPresentation/>:
                        <ManagePresentation/>:
                    <EditProject/>;

  return (
    <div>
      {to_render}
    </div>
  );
}

export default ManageProject;
