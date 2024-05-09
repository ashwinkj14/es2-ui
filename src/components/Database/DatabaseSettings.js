/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import dayjs from 'dayjs';
import {useState, useMemo, useRef, useCallback} from 'react';
import {Switch} from '@mui/material';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {FAILURE, SUCCESS, INPROGRESS, displayToast} from '../ToastUtil';

import './DatabaseSettings.css';
import httpClient from '../../helper/httpClient';

function DatabaseSettings() {
  const fileInput = useRef(null);
  const [activeTab, setActiveTab] = useState('configuration');
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSelectedFile] =useState(null);
  const [fileName, setFileName] = useState('');
  const [time, setTime] = useState(dayjs('2022-04-17T23:30'));
  const [period, setPeriod] = useState('Weekly');

  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [directory, setDirectory] = useState('');

  const [hostError, setHostError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [directoryError, setDirectoryError] = useState('');

  const displayError = (Error) => {
    return (
      <section className='add-user-error-container'>{Error}</section>
    );
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getConfiguration = async () => {
    try {
      const response = await httpClient.get(`/api/backup/configuration`);
      const config = response.data.config;
      setHost(config['host']);
      setUsername(config['username']);
      setDirectory(config['directory']);
    } catch (error) {
      displayToast('Error while fetching backup remote server config', FAILURE);
      console.log(error);
    };
  };

  const getSchedule = async () => {
    try {
      const response = await httpClient.get(`/api/backup/schedule`);
      const schedule = response.data.schedule;
      if (schedule['enable']) {
        setChecked(schedule['enable']);
        setPeriod(schedule['frequency']);
        setTime(dayjs('2022-04-17T'+schedule['time']));
      }
    } catch (error) {
      displayToast('Error while fetching backup schedule details', FAILURE);
      console.log(error);
    };
  };

  useMemo(() => {
    getConfiguration();
    getSchedule();
  }, []);

  const handleConfigValidation = () => {
    let errorExists = false;
    if (!host) {
      errorExists = true;
      setHostError('Server host address is required');
    }
    if (!username) {
      errorExists = true;
      setUsernameError('Username is required');
    }
    if (!password) {
      errorExists = true;
      setPasswordError('Password is required');
    }
    if (!directory) {
      errorExists = true;
      setDirectoryError('Backup directory is required');
    }
    return errorExists;
  };

  const resetConfigErrors = () => {
    setHostError('');
    setUsernameError('');
    setPasswordError('');
    setDirectoryError('');
  };

  const handleAddConfiguration = async () => {
    if (handleConfigValidation()) {
      return;
    }
    resetConfigErrors();
    const requestData = {
      host: host,
      username: username,
      password: password,
      directory: directory,
    };

    try {
      const response = await httpClient.put(`/api/backup/configuration`, requestData);
      const data = response.data;
      if (data.result && data.result === 'success') {
        displayToast(data.message, SUCCESS);
      } else {
        displayToast(data.error, FAILURE);
      }
    } catch (error) {
      displayToast('Error while updating backup configurations', FAILURE);
      console.log(error);
    };
  };

  const generateBackup = async () => {
    displayToast('Invoking backup generation. Please hang tight.', INPROGRESS);

    try {
      const response = await httpClient.post(`/api/backup/generate`);
      const data = response.data;
      if (data.result && data.result === 'success') {
        displayToast(data.message, SUCCESS);
      } else {
        displayToast(data.error, FAILURE);
      }
    } catch (error) {
      displayToast('Error while generating backup', FAILURE);
      console.log(error);
    }
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleFileSelectClick = () => {
    fileInput.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
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

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleScheduleSettings = async () => {
    const enabledRequest = {
      enable: checked,
      frequency: period,
      time: time.format('HH:mm'),
    };
    const disabledRequest = {
      enable: checked,
    };
    const requestData = (checked) ? enabledRequest : disabledRequest;

    try {
      const response = await httpClient.put(`/api/backup/schedule`, requestData);
      const data = response.data;
      if (data.result && data.result === 'success') {
        displayToast(data.message, SUCCESS);
      } else {
        displayToast(data.error, FAILURE);
      }
    } catch (error) {
      displayToast('Error while updating backup schedule', FAILURE);
      console.log(error);
    };
  };

  const handleRestoreDBSubmit = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await httpClient.post('/api/backup/restore', formData, {
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
      }
    } catch (error) {
      displayToast('Unable to restore database. Please try again.', FAILURE);
      console.error(error);
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
            <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
            <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
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
      <label>Upload File (Max File size : 4GB)</label>
      <div onDrop={onDrop} onDragOver={onDragOver} className='restore-db-upload-btn' onClick={handleFileSelectClick}>
        <span>Drag 'n' drop or click to select file</span>
        <span style={{color: 'rgb(164 25 25)'}}>{fileName}</span>
        <input type='file' style={{display: 'none'}} ref={fileInput} onChange={(event) => handleFileSelect(event)} placeholder='Upload'/>
      </div>
    </div>
    <div className="restore-db-submit-btn-container">
      <button className="restore-db-submit-btn" onClick={handleRestoreDBSubmit}>Submit</button>
    </div>
    {/* {displayError(selectedFileError)} */}
  </>);

  const configTab = (<>
    <div className='restore-db-upload-field-container'>
      <div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {m: 1, width: '35ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-host"
            label="Server host address"
            defaultValue=""
            className="login-input"
            size="small"
            color='success'
            sx={{
              mb: 1,
              width: '45ch',
              fontSize: '0.9rem',
              fontWeight: 300,
            }}
            value={host}
            onChange={(event) => setHost(event.target.value)}
            InputLabelProps={{
              sx: {
                'fontSize': '0.9rem',
                'fontWeight': 400,
                '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
              },
            }}
          ></TextField>
          {displayError(hostError)}
          <TextField
            id="outlined-username"
            label="Username"
            defaultValue=""
            className="login-input"
            size="small"
            color='success'
            sx={{
              mb: 1,
              width: '45ch',
              fontSize: '0.9rem',
              fontWeight: 300,
            }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            InputLabelProps={{
              sx: {
                'fontSize': '0.9rem',
                'fontWeight': 400,
                '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
              },
            }}
          ></TextField>
          {displayError(usernameError)}
          <TextField
            id="outlined-password"
            label="Password"
            defaultValue="1"
            size="small"
            type={showPassword ? 'text' : 'password'}
            sx={{
              mb: 1,
              width: '45ch',
              fontSize: '0.9rem',
              fontWeight: 300,
            }}
            color='success'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputLabelProps={{
              sx: {
                'fontSize': '0.9rem',
                'fontWeight': 400,
                '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
              },
            }}
            InputProps={{
              endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
            }}
          >
          </TextField>
          {displayError(passwordError)}
          <TextField
            id="outlined-directory"
            label="Backup Directory"
            defaultValue=""
            className="login-input"
            size="small"
            color='success'
            sx={{
              mb: 1,
              width: '45ch',
              fontSize: '0.9rem',
              fontWeight: 300,
            }}
            value={directory}
            onChange={(event) => setDirectory(event.target.value)}
            InputLabelProps={{
              sx: {
                'fontSize': '0.9rem',
                'fontWeight': 400,
                '&.MuiOutlinedInput-notchedOutline': {fontSize: '0.9rem'},
              },
            }}
          ></TextField>
          {displayError(directoryError)}
        </Box>
      </div>
    </div>
    <div className="restore-db-submit-btn-container">
      <button className="restore-db-submit-btn" onClick={handleAddConfiguration}>Submit</button>
    </div>
  </>);

  const renderTabContent = (activeTab==='trigger')?triggerTab:(activeTab==='schedule')?scheduleTab:(activeTab==='configuration')?configTab:restoreTab;

  return (
    <div className='dbsettings-main-container'>
      <div className='dbsettings-header-container'>
        <div className='dbsettings-header'>
          <h1 className='dbsettings-header-content'>Database Backup</h1>
        </div>
      </div>
      <div className='dbsettings-tab-container'>
        <div onClick={() => handleTabSelect('configuration')} className={`${tabHeaderContainer} ${activeTab==='configuration'?'dbsettings-tab-header-container-active':''}`}>
          <h3 className='dbsettings-header-content'>Remote Server Settings</h3>
        </div>
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
