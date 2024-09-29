import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from '../../utils';

function ProductDescription(props) {

  const callbacks = {
      onAdd: e => props.onAdd(props._id),
    };

  let language = localStorage.getItem('language');

  return (
    <div className='ProductDescription'>
        <p>{props.description}</p>
        <p>{language === 'ru' ? 'Страна производитель:' : 'Country of origin:'} <span>{props.country} ({props.cantryCode})</span></p>
        <p>{language === 'ru' ? 'Категория:' : 'Сategory:'} <span>{props.category}</span></p>
        <p>{language === 'ru' ? 'Год выпуска:' : 'Year of release:'} <span>{props.yearRelease}</span></p>
        <p className='ProductDescription-price'><span>{language === 'ru' ? 'Цена:' : 'Price:'} {numberFormat(props.price)} ₽</span></p>
        <button onClick={callbacks.onAdd}>{language === 'ru' ? 'Добавить' : 'Add'}</button>
    </div>
  );
}

  
ProductDescription.propTypes = {
    price: PropTypes.number,
    description: PropTypes.string,
    country: PropTypes.string,
    cantryCode: PropTypes.string,
    category: PropTypes.string,
    onAdd: PropTypes.func,
  };

  ProductDescription.defaultProps = {
    onAdd: () => {},
  };
  


export default memo(ProductDescription);
