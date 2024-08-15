/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import SettingsNav from '../../components/Settings/NavBar/SettingsNav';
import PublicationNav from '../../components/Publication/NavBar/PublicationNav';
import PatentNav from '../../components/Patent/NavBar/PatentNav';
import ProjectNav from '../../components/Project/NavBar/ProjectNav';

function Header({props}) {
  let Component = <></>;

  switch (props.page) {
    case '/publication':
      Component = <PublicationNav/>;
      break;
    case '/project':
      Component = <ProjectNav/>;
      break;
    case '/patent':
      Component = <PatentNav/>;
      break;
    case '/settings':
      Component = <SettingsNav/>;
      break;
    default:
      Component = <></>;
  }

  return (
    <section>
      {Component}
    </section>
  );
}

export default Header;
