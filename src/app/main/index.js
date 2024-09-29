import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useParams } from 'react-router-dom';

function Main() {
  const store = useStore();
  const {num} = useParams();

  const currentPageCatalog = num !== undefined ? num : 1;

  useEffect(() => {
    store.actions.catalog.load(currentPageCatalog);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    listEn: state.catalog.listEn,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
    totalPage: state.pagination.totalPage,
    currentPage: state.pagination.currentPage,
  }));


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    languageSelection: useCallback((e)=> store.actions.language.languageSelection(e), [store]),

  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket}/>;
      },
      [callbacks.addToBasket],
    ),
  };

  let list = select.language === 'ru' ? select.list : select.listEn;
  let title = select.language === 'ru' ? 'Магазин' : 'Shop';

  return (
    <PageLayout>
      <Head title={title} language={select.language} languageSelection={callbacks.languageSelection}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
      <List list={list} renderItem={renders.item}/>
      <Pagination productTotal={select.totalPage} currentPage={currentPageCatalog}/>
    </PageLayout>
  );
}

export default memo(Main);
