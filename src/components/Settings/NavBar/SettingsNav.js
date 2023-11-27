/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import {useUserStore} from '../../../store/es2Store';

import '../../Publication/NavBar/PublicationNav.css';

function SettingsNav({onSelect}) {
  const userTypeId = useUserStore((state) => state.userTypeId);
  const [selectedTab, setSelectedTab] = useState('usermgmt');

  const handleTabClick = (tab) => {
    onSelect(tab);
    setSelectedTab(tab);
  };

  return (
    <div>
      <section className="sideNav-container">
        <section className="sideNav-elements-container">
          <section className="sideNav-elements">
            <div onClick={() => handleTabClick('usermgmt')} className=
              {`sideNav-element ${selectedTab == 'usermgmt'?'active':''}`}>
              User Settings</div>
            {(userTypeId != 1)?<></>:<div onClick={() => handleTabClick('dbsettings')} className=
              {`sideNav-element ${selectedTab == 'dbsettings'?'active':''}`}>
              Database Backup</div>}
          </section>
        </section>
      </section>
    </div>
  );
}

export default SettingsNav;
