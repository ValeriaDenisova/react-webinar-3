import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { BrowserRouter } from 'react-router-dom';


console.log(localStorage.getItem('basket') === null);

if (localStorage.getItem('basket') === null){ 
  localStorage.setItem('basket', JSON.stringify([]));
}

if (localStorage.getItem('basketEn') === null){ 
  localStorage.setItem('basketEn', JSON.stringify([]));
}

if (localStorage.getItem('amout') === null){ 
  localStorage.setItem('amout', '0');
}

if (localStorage.getItem('sum') === null){ 
  localStorage.setItem('sum', '0');
}

if (localStorage.getItem('language') === null){ 
  localStorage.setItem('language', 'ru');
}


const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </StoreContext.Provider>,

);


