import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    listEn: state.basket.listEn,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} />;
      },
      [callbacks.removeFromBasket],
    ),
  };

  let language = localStorage.getItem('language');

  let title = language == 'ru' ? 'Корзина' : 'Basket';

  let list = language == 'ru' ? select.list : select.listEn;

  return (
    <ModalLayout title={title} onClose={callbacks.closeModal}>
      <List list={list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
