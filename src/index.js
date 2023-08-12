import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '.././src/Components/App/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import PlatformsContextProvider from './Components/Context/PlatformsContext'
import SortContextProvider from './Components/Context/SortContext';
import CategoriesContextProvider from './Components/Context/CategoriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoriesContextProvider>
      <SortContextProvider>
        <PlatformsContextProvider>
          <App />
        </PlatformsContextProvider>
      </SortContextProvider>
    </CategoriesContextProvider>
  </React.StrictMode>
);
