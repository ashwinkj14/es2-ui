/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useRef, useState} from 'react';
import axios from 'axios';
import {SUCCESS, FAILURE, displayToast} from '../../ToastUtil';

import './AddPresentation.css';
import {BASE_URL} from '../../../server-constants';

function AddPresentation({setIsAddPresentation, presentationRequest, setSelectedTab}) {
  const fileInput = useRef(null);

  const [link, setLink] = useState('');
  const [presentationType, setPresentationType] = useState('Regular');
  const [selectedFile, setSelectedFile] = useState(null);

  const [linkError, setLinkError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [selectedFileError, setSelectedFileError] = useState('');

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
    if (!selectedFile) {
      errorExists = true;
      setSelectedFileError('Missing attachment.');
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
    formData.append('file', selectedFile);
    formData.append('presentationName', link);
    formData.append('projectId', presentationRequest.project_id);
    formData.append('presentationType', presentationType);

    const api = BASE_URL+'/project/presentation/add';

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
        setSelectedTab('manage');
        setIsAddPresentation(false);
        displayToast('Presentation added successfully', status);
      }
    } catch (error) {
      displayToast('Unable to add the presentation record. Please try again.', FAILURE);
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
    setIsAddPresentation(false);
  };

  return (
    <div className="add-pub-container">
      <div className='back-btn-container'>
        <div className='back-btn' onClick={handleClickBack}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>
            back
        </div>
      </div>
      <div className="add-pub-header">Add Presentation</div>
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
                <option value="Regular">Regular</option>
                <option value="IAB">IAB</option>
              </select>
            </div>
            {displayError(typeError)}
          </div>
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-upload-field-container'>
            <label>Upload File (Max File size : 128MB)</label>
            <div className='add-pub-upload-btn' onClick={handleFileSelectClick}>
              <input type='file' ref={fileInput} onChange={(event) => handleFileSelect(event)} placeholder='Upload'/>
            </div>
          </div>
          {displayError(selectedFileError)}
        </div>
      </div>
      <div className="add-pub-submit-btn-container">
        <button className="add-pub-submit-btn" onClick={addPublication}>Submit</button>
      </div>
    </div>
  );
}

export default AddPresentation;
