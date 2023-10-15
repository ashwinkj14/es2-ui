/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import './SideBar.css';

function SideBar({content, closeAction}) {
  const handleClose = () =>{
    closeAction();
  };
  return (
    <div className="popup-displayer">
      <section className='popup-close' onClick={handleClose}>X</section>
      <section className="popup-body">
        {content}
      </section>
    </div>
  );
}

export default SideBar;
