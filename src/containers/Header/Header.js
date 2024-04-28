/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SettingsNav from '../../components/Settings/NavBar/SettingsNav';
import PublicationNav from '../../components/Publication/NavBar/PublicationNav';
import PatentNav from '../../components/Patent/NavBar/PatentNav';
import ProjectNav from '../../components/Project/NavBar/ProjectNav';
import {usePatentNavigation, useProjectGridStore, usePublicationNavigation, useSettingsStore} from '../../store/es2Store';

function Header({props}) {
  let Component = <></>;

  if (props.page != '/project') {
    const setSelectedTab = useProjectGridStore((state) => state.setSelectedTab);
    setSelectedTab('search');
  } else {
    Component = <ProjectNav/>;
  }

  if (props.page != '/patent') {
    const setSelectedTab = usePatentNavigation((state) => state.setSelectedTab);
    setSelectedTab('search');
  } else {
    Component = <PatentNav/>;
  }

  if (props.page != '/publication') {
    const setSelectedTab = usePublicationNavigation((state) => state.setSelectedTab);
    setSelectedTab('search');
  } else {
    Component = <PublicationNav/>;
  }

  if (props.page != '/settings') {
    const setSelectedTab = useSettingsStore((state) => state.setSelectedTab);
    setSelectedTab('usermgmt');
  } else {
    Component = <SettingsNav/>;
  }

  return (
    <section>
      {Component}
    </section>
  );
}

export default Header;
