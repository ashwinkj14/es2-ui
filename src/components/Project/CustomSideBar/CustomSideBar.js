/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import './CustomSideBar.css';

function CustomSideBar({content, closeAction}) {
  const handleClose = () =>{
    closeAction();
  };
  return (
    <div className="popup-displayer">
      <section className='popup-close' onClick={handleClose}>X</section>
      <section className="custom-popup-body">
        {content}
      </section>
    </div>
  );
}

export default CustomSideBar;
