/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';

import DataGrid from '../Grid/DataGrid';
import {usePresentationGridStore, useProjectGridStore} from '../../../store/es2Store';

import './ViewProject.css';
import ViewPresentation from '../../Presentation/ViewPresentation/ViewPresentation';

function ViewProject() {
  const presentationRequest = usePresentationGridStore((state) => state.presentationRequest);
  const getProjectList = useProjectGridStore((state) => state.getProjectList);
  const renderNoData = useProjectGridStore((state) => state.renderNoData);
  const resetProjectStore = useProjectGridStore((state) => state.resetProjectStore);

  useEffect(() => {
    getProjectList();
    return () => {
      resetProjectStore();
    };
  }, []);

  const view_project_page = <div className='view-project-container'>
    <div className='view-project-header'>Project Repository</div>
    <section className="project-data">
      <DataGrid/>
      {renderNoData}
    </section>
  </div>;

  const to_render = (presentationRequest == null)?view_project_page:
  <ViewPresentation/>;

  return (
    <div>
      {to_render}
    </div>
  );
}

export default ViewProject;
