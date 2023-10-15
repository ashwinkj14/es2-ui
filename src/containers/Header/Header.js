/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import NavBar from '../../components/Navbar/Navbar';
import SettingsNav from '../../components/Settings/NavBar/SettingsNav';
import PublicationNav from '../../components/Publication/NavBar/PublicationNav';
import './Header.css';

function Header({props, selectedTab, setSelectedTab}) {
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
  }
}

export default Header;
