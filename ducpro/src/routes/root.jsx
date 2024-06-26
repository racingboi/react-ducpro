import * as React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layout/dashboard.layout";
import Login from "../pages/login/login";
import Header from "../Component/Header/Header";
import Register from "../pages/register/Register";
import Cv from "../pages/Cv/Cv";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Products from "../pages/admin/Products/Products";
import ProductDetail from "../pages/admin/Products/ProductDetail/ProductDetail";
import User from "../pages/admin/users/User";
import Index from "../pages/product";
import List from "../pages/product/list"; 
import Cart from "../pages/cart/cart";
import NotFound from "../pages/NotFound/NotFound";
import NotFoundAdmin from "../pages/NotFound/NotFoundAdmin";
import CheckOau from "../pages/checkoau/CheckOau";
import Caterory from "../pages/admin/caterory/Caterory";
import Order from "../pages/admin/order/Order";


export const AppRouter = () => {
  let element = useRoutes([
    {
      element: <DashboardLayout>
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </DashboardLayout>,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/dashboard/products',
          element: <Products />,
        },
        {
          path: '/dashboard/products/:id',
          element: <ProductDetail />
        }, {
          path: '/dashboard/user',
          element: <User />
        },
        {
          path: '/dashboard/caterory',
          element: < Caterory />
        },
        {
          path: '/dashboard/order',
          element: < Order />
        }
        , {
          path: '*',
          element: < NotFoundAdmin />
        }
      ],
    },
    {
      element: <Header>
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </Header>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'cv',
          element: <Cv />
        },
        {
          path: 'login',
          element: < Login />
        },
        {
          path: 'register',
          element: < Register />
        },
        {
          path: 'products',
          element: < Index />
        },
        {
          path: 'products/:id',
          element: < List />
        }, {
          path: 'cart',
          element: < Cart />
        },
        {
          path: '*',
          element: < NotFound />
        },
        {
          path: 'checkoau',
          element: < CheckOau />
        },
       
      ],
    }
  ]);

  
  return element;
}