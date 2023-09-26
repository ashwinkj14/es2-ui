/* eslint-disable react/react-in-jsx-scope */
import NavBar from '../components/navbar';
import SubNavbar from '../components/subNavbar';

// eslint-disable-next-line require-jsdoc
function Header() {
  return (
    <section className="header-container">
      <NavBar/>
      <SubNavbar/>
    </section>
  );
}

export default Header;
