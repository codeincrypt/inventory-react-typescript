//MAIN PAGE
import Login from './auth/Login';

import Invoice from './invoice/Invoice';
import Invoicelist from './invoice/InvoiceList';

export const AuthRouter = [
  {
    path: '/login',
    component: Login,
    exact: true,
  }
];

export const AdminRouter = [
  {
    path: '/',
    component: Invoicelist,
    exact: true,
  },
  {
    path: '/invoice/:id',
    component: Invoice,
    exact: true,
  },
  {
    path: '/invoice',
    component: Invoicelist,
    exact: true,
  }
];
