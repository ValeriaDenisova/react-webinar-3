import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ productTotal, currentPage }) {
  

    let pageNumbers = [];

    if (currentPage == 1){
        pageNumbers = [1, 2, 3]
    } else if (currentPage == productTotal){
        pageNumbers = [productTotal - 2, productTotal - 1, productTotal]
    } else{
        pageNumbers = [Number(currentPage) - 1, currentPage, Number(currentPage) + 1]
    }

  
    return (

        <div>
            <ul className='pagination'>
            {pageNumbers[0] !== 1 && <li key={1} className =  'page-item'><a className='page-link'href='/'>1</a></li>}
            {pageNumbers[0] !== 1 && pageNumbers[0] !== 2 && <div className='points'>...</div>}
            {
                    pageNumbers.map(number => (
                        <li key={number} className = {currentPage == number ? 'page-item pagination-active' : 'page-item'}>
                            <a className='page-link' href={`/catalog/${number}`}>
                                {number}
                            </a>
                        </li>
                    ))
            }
       
        {pageNumbers[2] !== productTotal  && <div className='points'>...</div>}
        {pageNumbers[2] !== productTotal && <li key={productTotal} className =  'page-item'><a className='page-link'href={`/catalog/${productTotal}`}>{productTotal}</a></li>}
       
            </ul>
        </div>
    );

    
  }
  
  Pagination.propTypes = {
    productTotal: PropTypes.number,
    currentPage: PropTypes.number,
  };
  

  export default memo(Pagination);
  