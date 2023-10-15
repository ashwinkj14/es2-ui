/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import SideBar from '../../SideBar/SideBar';

import './Abstract.css';

function Abstract({abstract, action}) {
  const handleClose = () => action('');
  const toRender = <div>
    <div className="abstract-title">
            Abstract
    </div>
    <div className='abstract-content'>
      {abstract}
    </div>
  </div>;
  return (
    <SideBar content={toRender} closeAction={handleClose}/>
  );
}

export default Abstract;
