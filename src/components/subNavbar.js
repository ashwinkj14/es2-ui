/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/subNavbar.css';
function SubNavbar() {
  return (
    <div>
      <section className="sideNav-container">
        <section className="sideNav-elements-container">
          <section className="sideNav-elements">
            <div className="sideNav-element">Search</div>
            <div className="sideNav-element">Manage</div>
          </section>
          <section className="add-pub-btn-container">
            <div className="add-pub-btn">Add Publication</div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default SubNavbar;
