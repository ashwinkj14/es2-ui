/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';

import DataGrid from '../../Presentation/Grid/DataGrid';
import {usePresentationGridStore} from '../../../store/es2Store';

import EditPresentation from '../../Presentation/EditPresentation/EditPresentation';
import './ManagePresentation.css';

function ManagePresentation() {
  const setPresentationRequest = usePresentationGridStore((state) => state.setPresentationRequest);
  const setIsAddPresentation = usePresentationGridStore((state) => state.setIsAddPresentation);
  const selectedRecord = usePresentationGridStore((state) => state.selectedRecord);
  const renderNoData = usePresentationGridStore((state) => state.renderNoData);
  const getUserPresentations = usePresentationGridStore((state) => state.getUserPresentations);
  const resetPresentationStore = usePresentationGridStore((state) => state.resetPresentationStore);

  const gridRefresh = usePresentationGridStore((state) => state.gridRefresh);

  useEffect(() => {
    getUserPresentations();
    return () => {
      resetPresentationStore();
    };
  }, [gridRefresh]);

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
      <DataGrid/>
      {renderNoData}
    </section>
  </div>;

  return (
    <div>
      {(selectedRecord == null)?managePage:<EditPresentation/>}
    </div>
  );
}

export default ManagePresentation;
