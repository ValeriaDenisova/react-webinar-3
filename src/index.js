import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from './store/context';
import { I18nProvider } from './i18n/context';
import App from './app';
import Store from './store';

const store = new Store();

localStorage.setItem("category", '66fab39363bfe248a856308c || 66fab39363bfe248a856308d || 66fab39363bfe248a856308e || 66fab39363bfe248a856308f || 66fab39363bfe248a8563090 || 66fab39363bfe248a8563091 || 66fab39363bfe248a8563092 || 66fab39363bfe248a8563093 || 66fab39363bfe248a8563094 || 66fab39363bfe248a8563095')

// '66fab39363bfe248a856308c || 66fab39363bfe248a856308d || 66fab39363bfe248a856308e || 66fab39363bfe248a856308f || 66fab39363bfe248a8563090 || 66fab39363bfe248a8563091 || 66fab39363bfe248a8563092 || 66fab39363bfe248a8563093 || 66fab39363bfe248a8563094 || 66fab39363bfe248a8563095'

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StoreContext.Provider>,
);
