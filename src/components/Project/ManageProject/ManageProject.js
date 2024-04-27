/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';
import DataGrid from '../Grid/DataGrid';
import {useGridStore, usePresentationGridStore, useProjectGridStore} from '../../../store/es2Store';

import './ManageProject.css';
import EditProject from '../EditProject/EditProject';
import ManagePresentation from '../../Presentation/ManagePresentation/ManagePresentation';
import AddPresentation from '../../Presentation/AddPresentation/AddPresentation';

function ManageProject() {
  const gridRefresh = useGridStore((state) => state.gridRefresh);

  const getUserProjects = useProjectGridStore((state) => state.getUserProjects);
  const selectedRecord = useProjectGridStore((state) => state.selectedRecord);
  const renderNoData = useProjectGridStore((state) => state.renderNoData);

  const presentationRequest = usePresentationGridStore((state) => state.presentationRequest);
  const isAddPresentation = usePresentationGridStore((state) => state.isAddPresentation);

  useEffect(() => {
    getUserProjects();
  }, [gridRefresh]);

  const data_page = <div className='manage-pub-container'>
    <div className='manage-pub-header'>Manage Project</div>
    <section className="publication-data manage-pub-grid">
      <DataGrid/>
      {renderNoData}
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
