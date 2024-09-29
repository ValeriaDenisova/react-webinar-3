import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Language from '../language';

function Head({ title, language, languageSelection }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <Language language={language} languageSelection={languageSelection}/>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
