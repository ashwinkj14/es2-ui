/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState, useEffect} from 'react';
import axios from 'axios';

import DataGrid from '../Grid/DataGrid';
import {BASE_URL} from '../../../server-constants';

import './ViewProject.css';
import ViewPresentation from '../../Presentation/ViewPresentation/ViewPresentation';

function ViewProject({setPopupContent}) {
  const [projectList, setProjectList] = useState('');
  const [renderNoData, setRenderNoData] = useState(<></>);
  const [presentationRequest, setPresentationRequest] = useState(null);

  const onLoad = () => {
    const api = BASE_URL+`/project/list`;
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
          if (data.length==0) {
            setRenderNoData(<div className='no-data'>No Data Found</div>);
          } else {
            setRenderNoData(<></>);
          }
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
  }, []);

  const view_project_page = <div className='view-project-container'>
    <div className='view-project-header'>Project Repository</div>
    <section className="project-data">
      <DataGrid data={projectList} setPresentationRequest={setPresentationRequest} popupContent={setPopupContent}/>
      {renderNoData}
    </section>
  </div>;

  const to_render = (presentationRequest == null)?view_project_page:
  <ViewPresentation presentationRequest={presentationRequest} setPresentationRequest={setPresentationRequest} setPopupContent={setPopupContent}/>;

  return (
    <div>
      {to_render}
    </div>
  );
}

export default ViewProject;
