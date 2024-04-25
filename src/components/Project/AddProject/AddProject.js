/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import {useState} from 'react';
import axios from 'axios';
import {SUCCESS, FAILURE, displayToast} from '../../ToastUtil';

import './AddProject.css';
import {BASE_URL} from '../../../server-constants';
import {useProjectGridStore} from '../../../store/es2Store';

function AddProject() {
  const setSelectedTab = useProjectGridStore((state) => state.setSelectedTab);

  const [title, setTitle] = useState('');
  const [students, setStudents] = useState([{firstName: '', middleName: '', lastName: ''}]);
  const [mentors, setMentors] = useState([{firstName: '', middleName: '', lastName: ''}]);

  const [titleError, setTitleError] = useState('');
  const [studentsError, setStudentsError] = useState('');
  const [mentorsError, setMentorsError] = useState('');

  const updateStudentFirstName = (event, index) => {
    const updatedStudent = [...students];
    updatedStudent[index].firstName = event.target.value;
    setStudents(updatedStudent);
  };

  const updateStudentMiddleName = (event, index) => {
    const updatedStudent = [...students];
    updatedStudent[index].middleName = event.target.value;
    setStudents(updatedStudent);
  };

  const updateStudentLastName = (event, index) => {
    const updatedStudent = [...students];
    updatedStudent[index].lastName = event.target.value;
    setStudents(updatedStudent);
  };


  const updateMentorFirstName = (event, index) => {
    const updatedMentor = [...mentors];
    updatedMentor[index].firstName = event.target.value;
    setMentors(updatedMentor);
  };

  const updateMentorMiddleName = (event, index) => {
    const updatedMentor = [...mentors];
    updatedMentor[index].middleName = event.target.value;
    setMentors(updatedMentor);
  };

  const updateMentorLastName = (event, index) => {
    const updatedMentor = [...mentors];
    updatedMentor[index].lastName = event.target.value;
    setMentors(updatedMentor);
  };


  const addStudent = () => {
    const newStudent = {firstName: '', middleName: '', lastName: ''};
    setStudents([...students, newStudent]);
  };

  const addMentor = () => {
    const newMentor = {firstName: '', middleName: '', lastName: ''};
    setMentors([...mentors, newMentor]);
  };

  const handleStudentDelete = (index) => {
    const updatedStudent = [...students];
    updatedStudent.splice(index, 1);
    setStudents(updatedStudent);
  };

  const handleMentorDelete = (index) => {
    const updatedMentor = [...mentors];
    updatedMentor.splice(index, 1);
    setMentors(updatedMentor);
  };

  const handleValidation = () => {
    let errorExists = false;

    if (!title) {
      errorExists = true;
      setTitleError('Title field is empty.');
    }
    if (!students) {
      errorExists = true;
      setStudentsError('PI Students field is empty.');
    }
    if (!mentors) {
      errorExists = true;
      setMentorsError('IAB Mentors field is empty.');
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

    const requestData = {
      title: title,
      pi_students: JSON.stringify(students),
      iab_mentors: JSON.stringify(mentors),
    };

    const api = BASE_URL+'/project/add';

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(api, requestData, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      let status = FAILURE;
      if (response.status === 200) {
        if (response.data.result === 'success') {
          setSelectedTab('manage');
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
        displayToast('Project added successfully', status);
      }
    } catch (error) {
      displayToast('Unable to add the project record. Please try again.', FAILURE);
      console.error(error);
    }
  };

  const renderPIStudents = () => {
    return students.map((student, index) =>
      <div className='add-pub-author-details-container'>
        <input value={student.firstName} onChange={(event) => updateStudentFirstName(event, index)} placeholder='First Name' className="text-field author-field" type="text"/>
        <input value={student.middleName} onChange={(event) => updateStudentMiddleName(event, index)} placeholder='Middle Name' className="text-field author-field field-margin" type="text"/>
        <input value={student.lastName} onChange={(event) => updateStudentLastName(event, index)} placeholder='Last Name' className="text-field author-field field-margin" type="text"/>
        <div className='add-pub-author-delete-btn' onClick={() => handleStudentDelete(index)}>
          <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 60 60" viewBox="0 0 60 60" id="Delete"><path d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1
	h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2
	c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6
	h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z" fill="#d85b53" className="color000000 svgShape"></path><path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z" fill="#d85b53" className="color000000 svgShape"></path></svg>
        </div>
      </div>,
    );
  };

  const renderIABMentors = () => {
    return mentors.map((mentor, index) =>
      <div className='add-pub-author-details-container'>
        <input value={mentor.firstName} onChange={(event) => updateMentorFirstName(event, index)} placeholder='First Name' className="text-field author-field" type="text"/>
        <input value={mentor.middleName} onChange={(event) => updateMentorMiddleName(event, index)} placeholder='Middle Name' className="text-field author-field field-margin" type="text"/>
        <input value={mentor.lastName} onChange={(event) => updateMentorLastName(event, index)} placeholder='Last Name' className="text-field author-field field-margin" type="text"/>
        <div className='add-pub-author-delete-btn' onClick={() => handleMentorDelete(index)}>
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
      <div className="add-pub-header">Add Project</div>
      <div className="add-pub-form">
        <div className='add-pub-field-container'>
          <div className='add-pub-text-field-container'>
            <label>Title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="text-field" type="text"/>
          </div>
          {displayError(titleError)}
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-authors-container'>
            <label className='add-pub-author-label'>PI Students</label>
            {renderPIStudents()}
            <div className='add-pub-add-author-btn' onClick={addStudent}>
            Add Members
            </div>
          </div>
          {displayError(studentsError)}
        </div>
        <div className='add-pub-field-container'>
          <div className='add-pub-authors-container'>
            <label className='add-pub-author-label'>IAB Mentors</label>
            {renderIABMentors()}
            <div className='add-pub-add-author-btn' onClick={addMentor}>
            Add Members
            </div>
          </div>
          {displayError(mentorsError)}
        </div>
      </div>
      <div className="add-pub-submit-btn-container">
        <button className="add-pub-submit-btn" onClick={addPublication}>Submit</button>
      </div>
    </div>
  );
}

export default AddProject;
