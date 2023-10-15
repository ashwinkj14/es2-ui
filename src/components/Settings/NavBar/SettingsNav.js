/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';

import '../../Publication/NavBar/PublicationNav.css';

function SettingsNav({onSelect}) {
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
            <div onClick={() => handleTabClick('dbsettings')} className=
              {`sideNav-element ${selectedTab == 'dbsettings'?'active':''}`}>
              Database Settings</div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default SettingsNav;
