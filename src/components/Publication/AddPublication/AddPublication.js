/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState} from 'react';

import './AddPublication.css';

function AddPublication() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [mode, setMode] = useState('');
  const [number, setNumber] = useState('');
  const [copyrighted, setCopyrighted] = useState('');
  const [abstract, setAbstract] = useState('');
  const [date, setDate] = useState('');
  const [Keywords, setKeywords] = useState('');
  const [authors, setAuthors] = useState([]);
  // const [file, setFile] = useState(null);
  return (
    <div className="add-pub-container">
      <div className="add-pub-header">Add Publication</div>
      <div className="add-pub-form">
        <div className='row-container'>
          <div className='add-pub-text-field-container'>
            <label>Publication Title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="text-field" type="text"/>
          </div>
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
        </div>
        <div className='row-container'>
          <div className='add-pub-text-field-container'>
            <label>Status</label>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="user-type-dropdown">
              <option value="Published">Published</option>
              <option value="InReview">InReview</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className='add-pub-text-field-container'>
            <label>ES2 Project Number</label>
            <input value={number} onChange={(event) => setNumber(event.target.value)} className="text-field" type="number"/>
          </div>
        </div>
        <div className='row-container'>
          <div className='add-pub-text-field-container'>
            <label>Publication Mode</label>
            <div className='add-pub-mode'>
              <input value='private' onChange={(event) => setMode(event.target.value)} checked={mode === 'private'} className="text-field" type="radio"/>
              <label>Private</label>
              <input value='public' onChange={(event) => setMode(event.target.value)} checked={mode === 'public'} className="text-field" type="radio"/>
              <label>Public</label>
            </div>
          </div>
          <div className='add-pub-text-field-container'>
            <label>Is Paper Copyrighted?</label>
            <div className='add-pub-mode'>
              <input value='yes' onChange={(event) => setCopyrighted(event.target.value)} checked={copyrighted === 'yes'} className="text-field" type="radio"/>
              <label>Yes</label>
              <input value='no' onChange={(event) => setCopyrighted(event.target.value)} checked={copyrighted === 'no'} className="text-field" type="radio"/>
              <label>No</label>
            </div>
          </div>
        </div>
        <div className='row-container'>
          <div className='add-pub-text-field-container'>
            <label>Keywords</label>
            <input value={Keywords} onChange={(event) => setKeywords(event.target.value)} className="text-field" type="text"/>
          </div>
          <div className='add-pub-text-field-container'>
            <label>Publication Date</label>
            <input
              id="search-from-date"
              className="add-pub-box-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}/>
          </div>
        </div>
        <div className='add-pub-abstract-container'>
          <label>Abstract</label>
          <textarea value={abstract} onChange={(event) => setAbstract(event.target.value)} className="abstract-field" type="text"/>
        </div>
        <div className='add-pub-authors-container'>
          <label>Authors</label>
          <div>
            <input value={authors} onChange={(event) => setAuthors(event.target.value)} placeholder='First Name' className="text-field author-field" type="text"/>
            <input value={authors} onChange={(event) => setAuthors(event.target.value)} placeholder='Middle Name' className="text-field author-field" type="text"/>
            <input value={authors} onChange={(event) => setAuthors(event.target.value)} placeholder='Last Name' className="text-field author-field" type="text"/>
          </div>
          <div className='add-pub-add-author-btn'>
            Add Author
          </div>
        </div>
        <div className='add-pub-text-field-container'>
          <label>Upload File (Max File size : 128MB)</label>
          <div className='add-pub-add-author-btn'>
            Upload
          </div>
        </div>
      </div>
      <div className="add-pub-submit-btn-container">
        <button className="add-pub-submit-btn">Submit</button>
      </div>
    </div>
  );
}

export default AddPublication;
