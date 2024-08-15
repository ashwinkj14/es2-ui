/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useProjectGridStore} from '../../../store/es2Store';
import './ProjectNav.css';

function ProjectNav() {
  const selectedTab = useProjectGridStore((state) => state.selectedTab);
  const setSelectedTab = useProjectGridStore((state) => state.setSelectedTab);
  const handleTabClick = (value) => {
    setSelectedTab(value);
  };

  useEffect(()=>{
    setSelectedTab('search');
  }, []);

  return (
    <div>
      <section className="sideNav-container">
        <section className="sideNav-elements-container">
          <section className="sideNav-elements">
            <div onClick={() => handleTabClick('search')} className=
              {`sideNav-element ${selectedTab == 'search'?'active':''}`}>
              View
            </div>
            {<div onClick={() => handleTabClick('manage')} className=
              {`sideNav-element ${selectedTab == 'manage'?'active':''}`}>
              Manage</div>}
          </section>
          <section className="add-pub-btn-container">
            {<div onClick={() => handleTabClick('addPublication')} className=
              {`add-pub-btn ${selectedTab == 'addPublication'?'active':''}`}>
              <div className="add-pub-btn-content">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                  <path className={selectedTab == 'addPublication'?'add-pub-active':'add-pub-active'} d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#24b492" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path className={selectedTab == 'addPublication'?'add-pub-active':''} d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#24b492" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span>Add Project</span>
              </div>
            </div>}
          </section>
        </section>
      </section>
    </div>
  );
}

export default ProjectNav;
