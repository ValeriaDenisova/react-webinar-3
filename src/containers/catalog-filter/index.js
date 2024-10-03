import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import useInit from '../../hooks/use-init';
import SelectSort from '../../components/select-sort';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  useInit(() => {
    store.actions.categories.load();
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.list,
    categoriesValue: state.categories.value,
    categoriesSelected: state.categories.selected,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => {store.actions.catalog.setParams({ sort })}, [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),

    onSearchCategory: useCallback((category, i) => {
      store.actions.catalog.setParams({ category, page: 1 });
      store.actions.categories.selectedCategory(i);
    }, [store]),
    // Сброс
    onReset: useCallback(() => {
      store.actions.catalog.resetParams();
      store.actions.categories.selectedCategory(0)
    }, [store]),

  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };

  let categories = [], valueAll = ' ';
  select.categories.map(item => {
    valueAll = valueAll == ' ' ? item._id : valueAll + ' || ' + item._id;
    if (item.parent == null) {
    categories.push({id: item._id, title: item.title, children: []})
      select.categories.map(item2 => {
        if(item2.parent !== null){
        if(item._id == item2.parent._id){
          categories[categories.length - 1].children.push({id: item2._id, title: item2.title, children: []})
          select.categories.map(item3 => {
            if(item3.parent !== null){
            if(item2._id == item3.parent._id){
              categories[categories.length - 1].children[categories.length - 1].children.push({id: item3._id, title: item3.title})
            }
          }
          })
        }
      }
      })
    }
})
let parent, parent_2;

let categoriesArray = [{title: 'Все', value: valueAll}];
categories.map(item => {
  categoriesArray.push({title: item.title, value: item.id})
  parent = categoriesArray.length - 1;
  item.children.map(item2 => {
    categoriesArray[parent].value = categoriesArray[parent].value + ' || ' + item2.id;
    categoriesArray.push({title: '- ' + item2.title, value: item2.id})
    parent_2 = categoriesArray.length - 1;
      item2.children.map(item3 => {
        categoriesArray[parent].value = categoriesArray[parent].value + ' || ' + item3.id;
        categoriesArray[parent_2].value = categoriesArray[parent_2].value + ' || ' + item3.id;
        categoriesArray.push({title: '- - ' + item3.title, value: item3.id})
      })
  })
})




let selectCategory = categoriesArray[select.categoriesSelected];


const { t } = useTranslate();


  return (
    <SideLayout padding="medium">
      <Select options={categoriesArray} value={select.categoriesValue} onChange={callbacks.onSearchCategory} selected={selectCategory}/>
      <SelectSort options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
