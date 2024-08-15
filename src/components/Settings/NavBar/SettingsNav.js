/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {useEffect} from 'react';
import {useSettingsStore, useUserStore} from '../../../store/es2Store';

import '../../Publication/NavBar/PublicationNav.css';

function SettingsNav() {
  const userTypeId = useUserStore((state) => state.userTypeId);
  const {selectedTab, setSelectedTab} = useSettingsStore((state) => state);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(()=>{
    setSelectedTab('usermgmt');
  }, []);

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
