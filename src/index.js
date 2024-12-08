import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import GameRoutes from './Routes/Routes';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Set up router with App as root and GameRoutes as nested routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/home' replace /> }, // Redirects root to /home
      { path: '*', element: <GameRoutes /> }, // Nested routes under App
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
