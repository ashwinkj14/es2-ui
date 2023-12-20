/* eslint-disable no-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState} from 'react';
import axios from 'axios';
import {SUCCESS, FAILURE, displayToast} from '../../ToastUtil';
import {useNavigate} from 'react-router-dom';
import {usePublicationNavigation} from '../../../store/es2Store';

import './AddPublication.css';
import {BASE_URL} from '../../../server-constants';

function AddPublication() {
  const navigate = useNavigate();
  const setSelectedTab = usePublicationNavigation((state) => state.setSelectedTab);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Paper');
  const [status, setStatus] = useState('Published');
  const [mode, setMode] = useState('public');
  const [number, setNumber] = useState('');
  const [copyrighted, setCopyrighted] = useState('yes');
  const [abstract, setAbstract] = useState('');
  const [date, setDate] = useState('');
  const [keywords, setKeywords] = useState('');
  const [authors, setAuthors] = useState([{firstName: '', middleName: '', lastName: ''}]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [titleError, setTitleError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [modeError, setModeError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [copyrightedError, setCopyrightedError] = useState('');
  const [abstractError, setAbstractError] = useState('');
  const [dateError, setDateError] = useState('');
  const [keywordsError, setKeywordsError] = useState('');
  const [authorsError, setAuthorsError] = useState('');
  const [selectedFileError, setSelectedFileError] = useState('');

  const updateFirstName = (event, index) => {
    const updatedAuthor = [...authors];
    updatedAuthor[index].firstName = event.target.value;
    setAuthors(updatedAuthor);
  };

  const updateMiddleName = (event, index) => {
    const updatedAuthor = [...authors];
    updatedAuthor[index].middleName = event.target.value;
    setAuthors(updatedAuthor);
  };

  const updateLastName = (event, index) => {
    const updatedAuthor = [...authors];
    updatedAuthor[index].lastName = event.target.value;
    setAuthors(updatedAuthor);
  };

  const addAuthor = () => {
    const newAuthor = {firstName: '', middleName: '', lastName: ''};
    setAuthors([...authors, newAuthor]);
  };

  const handleAuthorDelete = (index) => {
    const updatedAuthor = [...authors];
    updatedAuthor.splice(index, 1);
    setAuthors(updatedAuthor);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleValidation = () => {
    let errorExists = false;

    if (!title) {
      errorExists = true;
      setTitleError('Title field is empty.');
    }
    if (!type) {
      errorExists = true;
      setTypeError('Type field is empty.');
    }
    if (!status) {
      errorExists = true;
      setStatusError('Status field is empty.');
    }
    if (!mode) {
      errorExists = true;
      setModeError('Mode field is empty.');
    }
    if (!number) {
      errorExists = true;
      setNumberError('Project Number field is empty.');
    }
    if (!copyrighted) {
      errorExists = true;
      setCopyrightedError('IsCopyrighted field is empty.');
    }
    if (!abstract) {
      errorExists = true;
      setAbstractError('Abstract field is empty.');
    }
    if (!date) {
      errorExists = true;
      setDateError('Date field is empty.');
    }
    if (!keywords) {
      errorExists = true;
      setKeywordsError('Keywords field is empty.');
    }
    if (!authors) {
      errorExists = true;
      setAuthorsError('Authors field is empty.');
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
    formData.append('title', title);
    formData.append('type', type);
    formData.append('status', status);
    formData.append('mode', mode);
    formData.append('keywords', keywords);
    formData.append('authors', JSON.stringify(authors));
    formData.append('project_number', number);
    formData.append('isCopyrighted', copyrighted);
    formData.append('publication_date', date);
    formData.append('publication_abstract', abstract);

    const api = BASE_URL+'/publication/add';

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
          setSelectedTab('manage');
        }
      }
      const message = response.data.message;
      if (message) {
        displayToast(message, status);
      } else {
        const error = response.data.error;
        displayToast(error, status);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      displayToast('Unable to add the Publication record. Please try again.', FAILURE);
      console.error(error);
    }
  };

  const renderAuthors = () => {
    return authors.map((author, index) =>
      <div className='add-pub-author-details-container'>
        <input value={author.firstName} onChange={(event) => updateFirstName(event, index)} placeholder='First Name' className="text-field author-field" type="text"/>
        <input value={author.middleName} onChange={(event) => updateMiddleName(event, index)} placeholder='Middle Name' className="text-field author-field field-margin" type="text"/>
        <input value={author.lastName} onChange={(event) => updateLastName(event, index)} placeholder='Last Name' className="text-field author-field field-margin" type="text"/>
        <div className='add-pub-author-delete-btn' onClick={() => handleAuthorDelete(index)}>
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 60 60" viewBox="0 0 60 60" id="Delete"><path d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1
	h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2
	c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6
	h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z" fill="#d85b53" className="color000000 svgShape"></path><path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z" fill="#d85b53" className="color000000 svgShape"></path></svg>
        </div>
      </div>,
    );
  };

  return (
    <div className="add-pub-container">
      <div className="add-pub-header">Add Publication</div>
      <div className="add-pub-form">
        <div className='row-container'>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Publication Title</label>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="text-field" type="text"/>
            </div>
            {displayError(titleError)}
          </div>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Publication Type</label>
              <select value={type} onChange={(event) => setType(event.target.value)} className="user-type-dropdown">
                <option value="Paper">Paper</option>
                <option value="Presentation">Presentation</option>
                <option value="Report">Report</option>
                <option value="Dissertation">Dissertation</option>
                <option value="Brochure">Brochure</option>
              </select>
            </div>
            {displayError(typeError)}
          </div>
        </div>
        <div className='row-container'>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Status</label>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="user-type-dropdown">
                <option value="Published">Published</option>
                <option value="InReview">InReview</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            {displayError(statusError)}
          </div>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>ES2 Project Number</label>
              <input value={number} onChange={(event) => setNumber(event.target.value)} className="text-field" type="number"/>
            </div>
            {displayError(numberError)}
          </div>
        </div>
        <div className='row-container'>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Publication Mode</label>
              <div className='add-pub-mode'>
                <input value='Public' onChange={(event) => setMode(event.target.value)} checked={mode.toLowerCase() === 'public'} className="text-field" type="radio"/>
                <label>Public</label>
                <input value='Private' onChange={(event) => setMode(event.target.value)} checked={mode.toLowerCase() === 'private'} className="text-field" type="radio"/>
                <label>Private</label>
              </div>
            </div>
            {displayError(modeError)}
          </div>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Is Paper Copyrighted?</label>
              <div className='add-pub-mode'>
                <input value='yes' onChange={(event) => setCopyrighted(event.target.value)} checked={copyrighted === 'yes'} className="text-field" type="radio"/>
                <label>Yes</label>
                <input value='no' onChange={(event) => setCopyrighted(event.target.value)} checked={copyrighted === 'no'} className="text-field" type="radio"/>
                <label>No</label>
              </div>
            </div>
            {displayError(copyrightedError)}
          </div>
        </div>
        <div className='row-container'>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Keywords</label>
              <input value={keywords} onChange={(event) => setKeywords(event.target.value)} className="text-field" type="text"/>
            </div>
            {displayError(keywordsError)}
          </div>
          <div className='add-pub-field-container'>
            <div className='add-pub-text-field-container'>
              <label>Publication Date</label>
              <input
                id="search-from-date"
                className="add-pub-box-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}/>
            </div>
            {displayError(dateError)}
          </div>
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-abstract-container'>
            <label>Abstract</label>
            <textarea value={abstract} onChange={(event) => setAbstract(event.target.value)} className="abstract-field" type="text"/>
          </div>
          {displayError(abstractError)}
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-authors-container'>
            <label className='add-pub-author-label'>Authors</label>
            {renderAuthors()}
            <div className='add-pub-add-author-btn' onClick={addAuthor}>
            Add Author
            </div>
          </div>
          {displayError(authorsError)}
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-upload-field-container'>
            <label>Upload File (Max File size : 128MB)</label>
            <div className='add-pub-upload-btn'>
              <input type='file' onChange={(event) => handleFileSelect(event)} placeholder='Upload'/>
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

export default AddPublication;
