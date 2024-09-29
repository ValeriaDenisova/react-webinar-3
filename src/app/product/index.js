import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import ProductDescription from '../../components/product-description';

function Product() {

    const {id} = useParams();
    const store = useStore();

    let [data, setData] = useState();
    let [dataEn, setDataEn] = useState();
    let title, description, country, cantryCode, category, yearRelease, price;

    let language = localStorage.getItem('language');

   


	useEffect(
		() =>{
			fetch(`/api/v1/articles/${id}?lang=ru&&fields=*,madeIn(title,code),category(title)`)
				.then(response => response.json())
				.then(json => setData(json));

        fetch(`/api/v1/articles/${id}?lang=en&&fields=*,madeIn(title,code),category(title)`)
				.then(response => response.json())
				.then(json => setDataEn(json));

			}, []

        )
        if(data !== undefined && language == 'ru'){ 
            title = data.result.title;
            description = data.result.description; 
            country = data.result.madeIn.title;
            cantryCode = data.result.madeIn.code;
            category = data.result.category.title;
            yearRelease = data.result.dateCreate.slice(0, 4);
            price = data.result.price;
        } else if(dataEn !== undefined && language == 'en'){
            title = dataEn.result.title;
            description = dataEn.result.description; 
            country = dataEn.result.madeIn.title;
            cantryCode = dataEn.result.madeIn.code;
            category = dataEn.result.category.title;
            yearRelease = dataEn.result.dateCreate.slice(0, 4);
            price = dataEn.result.price;
        }
   

 

    const callbacks = {

        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        languageSelection: useCallback((e)=> store.actions.language.languageSelection(e), [store]),
      };


      useEffect(() => {
        store.actions.catalog.load();
      }, []);

      const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.language.language,
      }));
    
    return (
        <>
        <PageLayout>
             <Head title={title} language={select.language} languageSelection={callbacks.languageSelection}/>
             <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} language={select.language}/>
             <ProductDescription _id={id} title={title} description={description} country={country} cantryCode={cantryCode} category={category} yearRelease={yearRelease} price={price} 
             onAdd={callbacks.addToBasket}
             />
        </PageLayout>
        </>
    );
  }
  
  export default memo(Product);
  