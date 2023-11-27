/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import axios from 'axios';
import dayjs from 'dayjs';
import {useState} from 'react';
import {Switch} from '@mui/material';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate} from 'react-router-dom';

import './DatabaseSettings.css';
import {BASE_URL} from '../../server-constants';

function DatabaseSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trigger');
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSelectedFile] =useState(null);
  const [time, setTime] = useState(dayjs('2022-04-17T23:30'));
  const [period, setPeriod] = useState('weekly');


  const generateBackup = () => {
    const api = BASE_URL+`/settings/backup/generate`;

    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.post(api, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data);
    }) .catch((error) => {
      if (error.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.value.file[0]);
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleScheduleSettings = () => {
  };

  const handleRestoreDBSubmit = () => {
    if (!selectedFile) {
      return;
    }
  };

  const handleSwitchChange = () => {
    setChecked(!checked);
  };

  const label = {inputProps: {'aria-label': 'enable'}};

  const tabHeaderContainer = 'dbsettings-tab-header-container';

  const triggerTab = (<>
    <div className='trigger-container'>
      {/* <div className='trigger-input-field-container'>
        <div className='trigger-input-field-label'>File Name</div>
        <input className='trigger-input-field'/>
      </div> */}
      <div className='backup-btn-container'>
        <div onClick={generateBackup} className='backup-btn'>Backup</div>
      </div>
    </div>
  </>);

  const scheduleSettings = (
    <div className='schedule-settings-container'>
      <div className='schedule-radio-btn-container'>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Period</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={period}
            onChange={handlePeriodChange}
          >
            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
            <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='schedule-time-picker'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Backup time"
            value={time}
            onChange={(newValue) => setTime(newValue)}
          />
        </LocalizationProvider>
      </div>
    </div>
  );

  const renderScheduleSettings = (checked)?scheduleSettings:(<></>);

  const scheduleTab = (<>
    <div>
      <div className='schedule-switch-container'>
        <Switch
          checked={checked}
          onChange={handleSwitchChange}
          {...label} />
        <p>Enable backup scheduling</p>
      </div>
      {renderScheduleSettings}
      <div className="restore-db-submit-btn-container">
        <button className="restore-db-submit-btn" onClick={handleScheduleSettings}>Submit</button>
      </div>
    </div>
  </>);

  const restoreTab = (<>
    <div className='restore-db-upload-field-container'>
      <label>Upload File (Max File size : 2GB)</label>
      <div className='restore-db-upload-btn'>
        <input type='file' onChange={(event) => handleFileSelect(event)} placeholder='Upload'/>
      </div>
    </div>
    <div className="restore-db-submit-btn-container">
      <button className="restore-db-submit-btn" onClick={handleRestoreDBSubmit}>Submit</button>
    </div>
    {/* {displayError(selectedFileError)} */}
  </>);

  const renderTabContent = (activeTab==='trigger')?triggerTab:(activeTab==='schedule')?scheduleTab:restoreTab;

  return (
    <div className='dbsettings-main-container'>
      <div className='dbsettings-header-container'>
        <div className='dbsettings-header'>
          <h1 className='dbsettings-header-content'>Database Backup</h1>
        </div>
      </div>
      <div className='dbsettings-tab-container'>
        <div onClick={() => handleTabSelect('trigger')} className={`${tabHeaderContainer} ${activeTab==='trigger'?'dbsettings-tab-header-container-active':''}`}>
          <h3 className='dbsettings-header-content'>Trigger</h3>
        </div>
        <div onClick={() => handleTabSelect('schedule')} className={`${tabHeaderContainer} ${activeTab==='schedule'?'dbsettings-tab-header-container-active':''}`}>
          <h3 className='dbsettings-header-content'>Schedule</h3>
        </div>
        <div onClick={() => handleTabSelect('restore')} className={`${tabHeaderContainer} ${activeTab==='restore'?'dbsettings-tab-header-container-active':''}`}>
          <h3 className='dbsettings-header-content'>Restore</h3>
        </div>
      </div>
      {renderTabContent}
    </div>
  );
}

export default DatabaseSettings;
