import { createBrowserHistory } from 'history';
import UsersTable from './Components/UsersTable/UsersTable';
import Customer from './Components/Customer/Customer';

const RouterMap: IIMPERVARoute[] = [
  {
    path: "/customers",
    component: UsersTable
  },
  {
    path: "/customer",
    component: Customer
  }
];

export const history = createBrowserHistory();

export default RouterMap;
