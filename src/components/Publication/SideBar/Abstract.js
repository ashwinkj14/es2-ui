/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import SideBar from '../../SideBar/SideBar';

import './Abstract.css';

function Abstract({abstract, action}) {
  const handleClose = () => action('');
  const unescapedString = JSON.parse(`"${abstract}"`);
  const toRender = <div className='abstract-container'>
    <div className="abstract-title">
            Abstract
    </div>
    <div className='abstract-content-container'>
      <p className='abstract-content'>{unescapedString}</p>
    </div>
  </div>;
  return (
    <SideBar content={toRender} closeAction={handleClose}/>
  );
}

export default Abstract;
