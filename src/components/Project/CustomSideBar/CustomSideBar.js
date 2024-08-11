/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import './CustomSideBar.css';

function CustomSideBar({content, closeAction}) {
  const [displayer, setDisplayer] = useState('popup-displayer popup-open-animation');
  const handleClose = () =>{
    setDisplayer('popup-displayer popup-close-animation');
    setTimeout(()=>{
      closeAction();
    }, 300);
  };
  return (
    <div className={displayer}>
      <section className='popup-close' onClick={handleClose}>X</section>
      <section className="custom-popup-body">
        {content}
      </section>
    </div>
  );
}

export default CustomSideBar;
