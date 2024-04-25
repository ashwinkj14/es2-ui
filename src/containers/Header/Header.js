/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import NavBar from '../../components/Navbar/Navbar';
import SettingsNav from '../../components/Settings/NavBar/SettingsNav';
import PublicationNav from '../../components/Publication/NavBar/PublicationNav';
import PatentNav from '../../components/Patent/NavBar/PatentNav';
import './Header.css';
import ProjectNav from '../../components/Project/NavBar/ProjectNav';
import {usePatentNavigation, useProjectGridStore, usePublicationNavigation} from '../../store/es2Store';

function Header({props, selectedTab, setSelectedTab}) {
  if (props.page != 'project') {
    const setTab = useProjectGridStore((state) => state.setSelectedTab);
    setTab('search');
  }
  if (props.page != 'patent') {
    const setTab = usePatentNavigation((state) => state.setSelectedTab);
    setTab('search');
  }
  if (props.page != 'publication') {
    const setTab = usePublicationNavigation((state) => state.setSelectedTab);
    setTab('search');
  }
  if (props.page === 'settings') {
    const handleSettingsTabChange = (tab) => {
      props.onTabChange(tab);
    };
    return (
      <section className="header-container">
        <NavBar/>
        <SettingsNav onSelect={handleSettingsTabChange}/>
      </section>
    );
  } else if (props.page === 'publication') {
    return (
      <section className="header-container">
        <NavBar/>
        <PublicationNav selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      </section>
    );
  } else if (props.page === 'patent') {
    return (
      <section className="header-container">
        <NavBar/>
        <PatentNav selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      </section>
    );
  } else if (props.page === 'project') {
    return (
      <section className="header-container">
        <NavBar/>
        <ProjectNav selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      </section>
    );
  }
}

export default Header;
