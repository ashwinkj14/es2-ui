/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useRef, useState, useCallback} from 'react';
import {SUCCESS, FAILURE, displayToast} from '../../ToastUtil';

import './AddPresentation.css';
import {usePresentationGridStore, useProjectGridStore} from '../../../store/es2Store';
import httpClient from '../../../helper/httpClient';

function AddPresentation() {
  const fileInput = useRef(null);

  const setSelectedTab = useProjectGridStore((state) => state.setSelectedTab);

  const setIsAddPresentation = usePresentationGridStore((state) => state.setIsAddPresentation);
  const presentationRequest = usePresentationGridStore((state) => state.presentationRequest);

  const [link, setLink] = useState('');
  const [presentationType, setPresentationType] = useState('Regular');
  const [presentationDate, setPresentationDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [linkError, setLinkError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [dateError, setDateError] = useState('');
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
    if (!presentationDate) {
      errorExists = true;
      setDateError('Presentation Date field is empty.');
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
    formData.append('presentationDate', presentationDate);

    try {
      const response = await httpClient.post('/api/project/presentation/add', formData, {
        headers: {
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
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleFileSelectClick = () => {
    fileInput.current.click();
  };

  const handleClickBack = () => {
    setIsAddPresentation(false);
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setSelectedFile(files[0]);
    setFileName(files[0].name);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);


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
            <div onDrop={onDrop} onDragOver={onDragOver} className='add-pub-upload-btn' onClick={handleFileSelectClick}>
              <span>Drag 'n' drop or click to select file</span>
              <span style={{color: 'rgb(164 25 25)'}}>{fileName}</span>
              <input type='file' style={{display: 'none'}} ref={fileInput} onChange={(event) => handleFileSelect(event)} placeholder='Upload'/>
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
