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
          path: '/dashboard/users',
          element: <User />
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
        }
      ],
    },
  ]);

  return element;
}