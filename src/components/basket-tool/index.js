import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import Menu from '../menu';

function BasketTool({ sum, amount, onOpen, language }) {
  const cn = bem('BasketTool');
  return (
    
    <div className={cn()}>
      <Menu language={language}/>
      <div>
      <span className={cn('label')}>{language === 'ru' ? 'В корзине:' : 'In the shopping cart:'}</span>
      {language === 'ru'  && <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>}
      {language === 'en'  && <span className={cn('total')}>
        {amount
          ? `${amount} ${amount == 1 ? 'product' : 'products'} / ${numberFormat(sum)} ₽`
          : `empty`}
      </span>}
      <button onClick={onOpen}>{language === 'ru' ? 'Перейти' : 'go over'}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
