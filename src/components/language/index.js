import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Language({language, languageSelection}) {

   

  return (
    <div className='Language'>
        <div className={language == 'ru' ? 'Language-button Language-active' : 'Language-button'} id='ru' onClick={(e)=>languageSelection(e.target.id)}>{language == 'ru' ? 'Русский' : 'Russian'}</div>
        <div className={language == 'en' ? 'Language-button Language-active' : 'Language-button'} id='en' onClick={(e)=>languageSelection(e.target.id)}>{language == 'en' ? 'English' : 'Англйский'}</div>
    </div>
  );
}

// Head.propTypes = {
//   title: PropTypes.node,
// };

export default memo(Language);