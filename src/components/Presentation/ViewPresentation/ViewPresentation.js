/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {usePresentationGridStore} from '../../../store/es2Store';
import DataGrid from '../../Presentation/Grid/DataGrid';
import {BASE_URL} from '../../../server-constants';

import './ViewPresentation.css';

function ViewPresentation() {
  const navigate = useNavigate();
  const setPresentationList = usePresentationGridStore((state) => state.setPresentationList);
  const presentationRequest = usePresentationGridStore((state) => state.presentationRequest);
  const setPresentationRequest = usePresentationGridStore((state) => state.setPresentationRequest);

  const [renderNoData, setRenderNoData] = useState(<></>);

  const onLoad = () => {
    const api = BASE_URL+`/project/presentation/list`;
    const token = localStorage.getItem('token');

    const requestParams = {
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
          setPresentationList(data);
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

  return (
    <div className='view-project-container'>
      <div className='back-btn-container'>
        <div className='back-btn' onClick={handleClickBack}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>
            back
        </div>
      </div>
      <div className='view-project-header'>Presentations</div>
      <section className="project-data">
        <DataGrid/>
        {renderNoData}
      </section>
    </div>
  );
}

export default ViewPresentation;
