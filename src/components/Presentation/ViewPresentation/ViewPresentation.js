/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useEffect} from 'react';
import {usePresentationGridStore} from '../../../store/es2Store';
import DataGrid from '../../Presentation/Grid/DataGrid';

import './ViewPresentation.css';

function ViewPresentation() {
  const getPresentationList = usePresentationGridStore((state) => state.getPresentationList);
  const setPresentationRequest = usePresentationGridStore((state) => state.setPresentationRequest);
  const renderNoData = usePresentationGridStore((state) => state.renderNoData);
  const resetPresentationStore = usePresentationGridStore((state) => state.resetPresentationStore);

  useEffect(() => {
    getPresentationList();
    return () => {
      resetPresentationStore();
    };
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
