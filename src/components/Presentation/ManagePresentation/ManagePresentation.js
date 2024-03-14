/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import DataGrid from '../../Presentation/Grid/DataGrid';
import {BASE_URL} from '../../../server-constants';

import EditPresentation from '../../Presentation/EditPresentation/EditPresentation';
import './ManagePresentation.css';

function ManagePresentation({presentationRequest, setPresentationRequest, setPopupContent, setIsAddPresentation}) {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState('');
  const [renderNoData, setRenderNoData] = useState(<></>);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const onLoad = () => {
    const api = BASE_URL+`/project/presentation/list`;
    const token = localStorage.getItem('token');

    const requestParams = {
      presentationType: presentationRequest.presentation_type,
      projectId: presentationRequest.project_id,
    };

    axios.get(api, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      params: requestParams,
    })
        .then((response) => {
          const result = response.data;
          const data = result.data;
          if (data.length==0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }
          setProjectList(data);
        })
        .catch((error) => {
          if (error.code === 'ERR_NETWORK') {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          console.log('Error fetching data:', error);
        });
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleClickBack = () => {
    setPresentationRequest(null);
  };

  const handleAddPresentation = () => {
    setIsAddPresentation(true);
  };

  const managePage = <div className='view-project-container'>
    <div className='back-btn-container'>
      <div className='back-btn' onClick={handleClickBack}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>
back
      </div>
    </div>
    <div className='view-project-header'>Manage Presentations</div>
    <div className='add-presentation-btn-container'>
      <div className='add-presentation-btn' onClick={handleAddPresentation}>Add Presentation</div>
    </div>
    <section className="project-data">
      <DataGrid data={projectList} selectedTab="manage" setSelectedRecord={setSelectedRecord} popupContent={setPopupContent}/>
      {renderNoData}
    </section>
  </div>;

  return (
    <div>
      {(selectedRecord == null)?managePage:<EditPresentation selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord}/>}
    </div>
  );
}

export default ManagePresentation;
