/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useRef, useState} from 'react';
import axios from 'axios';
import {SUCCESS, FAILURE, displayToast} from '../../ToastUtil';
import {useNavigate} from 'react-router-dom';
import {usePresentationGridStore} from '../../../store/es2Store';

import './EditPresentation.css';
import {BASE_URL} from '../../../server-constants';

function EditPresentation() {
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const selectedRecord = usePresentationGridStore((state) => state.selectedRecord);
  const setSelectedRecord = usePresentationGridStore((state) => state.setSelectedRecord);
  const presentationRequest = usePresentationGridStore((state) => state.presentationRequest);

  const [link, setLink] = useState(selectedRecord.presentation_name);
  const [presentationType, setPresentationType] = useState(selectedRecord.presentation_type);
  const [presentationDate, setPresentationDate] = useState(selectedRecord.presentation_date);
  const [selectedFile, setSelectedFile] = useState(null);

  const [linkError, setLinkError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [dateError, setDateError] = useState('');

  const {gridRefresh, setGridRefresh} = usePresentationGridStore((state) => state);

  const handleValidation = () => {
    let errorExists = false;

    if (!link) {
      errorExists = true;
      setLinkError('Presentation Name field is empty.');
    }
    if (!presentationType) {
      errorExists = true;
      setTypeError('Presentation Type field is empty.');
    }
    if (!presentationDate) {
      errorExists = true;
      setDateError('Presentation Date field is empty.');
    }
    return errorExists;
  };

  const displayError = (Error) => {
    return (
      <section className='add-pub-error-container'>{Error}</section>
    );
  };

  const addPublication = async () => {
    if (handleValidation()) {
      return;
    }

    const formData = new FormData();
    if (selectedFile!=null) {
      formData.append('file', selectedFile);
    }
    formData.append('presentationName', link);
    formData.append('projectId', presentationRequest.project_id);
    formData.append('presentationId', selectedRecord.presentation_id);
    formData.append('presentationType', presentationType);
    formData.append('presentationDate', presentationDate);

    const api = BASE_URL+'/project/presentation/update';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(api, formData, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });

      let status = FAILURE;
      if (response.status === 200) {
        if (response.data.result === 'success') {
          status = SUCCESS;
        }
      }
      if (status === FAILURE) {
        const message = response.data.message;
        if (message) {
          displayToast(message, status);
        } else {
          const error = response.data.error;
          displayToast(error, status);
        }
      } else {
        setSelectedRecord(null);
        setGridRefresh(!gridRefresh);
        displayToast('Presentation updated successfully', status);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      displayToast('Unable to update the presentation record. Please try again.', FAILURE);
      console.error(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSelectClick = () => {
    fileInput.current.click();
  };

  const handleClickBack = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="add-pub-container">
      <div className='back-btn-container'>
        <div className='back-btn' onClick={handleClickBack}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>
            back
        </div>
      </div>
      <div className="add-pub-header">Edit Presentation</div>
      <div className="add-pub-form">
        <div className='row-container'>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Presentation Name</label>
              <input value={link} onChange={(event) => setLink(event.target.value)} className="text-field" type="text"/>
            </div>
            {displayError(linkError)}
          </div>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Presentation Type</label>
              <select value={presentationType} onChange={(event) => setPresentationType(event.target.value)} className="user-type-dropdown">
                <option value="Regular">Monthly Mentor Meeting</option>
                <option value="IAB">IAB Meeting</option>
              </select>
            </div>
            {displayError(typeError)}
          </div>
        </div>
        <div className='row-container'>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Presentation Date</label>
              <input value={presentationDate} onChange={(event) => setPresentationDate(event.target.value)} className="text-field" type="date"/>
            </div>
            {displayError(dateError)}
          </div>
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-upload-field-container'>
            <label>Upload File (Max File size : 128MB)</label>
            <div className='add-pub-upload-btn' onClick={handleFileSelectClick}>
              <input type='file' ref={fileInput} onChange={(event) => handleFileSelect(event)} placeholder='Upload'/>
            </div>
          </div>
        </div>
      </div>
      <div className="add-pub-submit-btn-container">
        <button className="add-pub-submit-btn" onClick={addPublication}>Submit</button>
      </div>
    </div>
  );
}

export default EditPresentation;
