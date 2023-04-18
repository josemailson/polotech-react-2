import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from "routes/AppRoutes";
import { AppLayoutContainer, GlobalStyle } from 'styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.createElement('div')
);
root.render(
  <>
    <GlobalStyle/>
    <AppLayoutContainer>
      <RouterProvider router={router} />
    </AppLayoutContainer>
  </>
);