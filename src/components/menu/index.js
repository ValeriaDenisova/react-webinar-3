import { memo } from 'react';
import './style.css';



function Menu() {

    let language = localStorage.getItem('language');
  return (
    <div className="Menu">
      <a href="/">{language === 'ru' ? 'Главная' : 'Main'}</a>
    </div>
  );
}


export default memo(Menu);
