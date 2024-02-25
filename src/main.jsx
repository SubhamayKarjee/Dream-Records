import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense } from 'react';
import LoadingComponentsForPage from './LoadingComponents/LoadingComponentsForPage';
import LoadingComponentsInsidePage from './LoadingComponents/LoadingComponentsInsidePage';
import axios from 'axios';


// Commont Routes import_______________________________________________________________
const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const AdminLoginPage = React.lazy(() => import('./Authentication/LogIn/AdminLoginPage'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
// Admin Routes import__________________________________________________________________
const DashBoardForAdmin = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashBoardForAdmin'));
const CreateUserForm = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/CreateUserForm'));

// User Dashboard Routes import_________________________________________________________
const UserAdminHomePage = React.lazy(() => import('./UserAdminDashboard/UserAdminHomePage/UserAdminHomePage'))



// Route Start ________________________________
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Suspense fallback={<LoadingComponentsForPage/>}><LogIn/></Suspense>,
  // },
  {
    path: "/log-in",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><LogIn/></Suspense>,
  },
  {
    path: "/admin",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><AdminLoginPage/></Suspense>,
  },
  {
    path: "/set-password/:id",
    loader: ({ params }) => axios.get(`http://localhost:5000/api/v1/users/${params.id}`),
    element: <Suspense fallback={<LoadingComponentsForPage/>}><SignUp/></Suspense>,
  },
  // Admin Dashboard________________________________________________________________________
  {
    path: "/admin-dashboard",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><DashBoardForAdmin/></Suspense>,
    children: [
      {
        path: '/admin-dashboard',
        element: <div>Mehedi Hasan</div>
      },
      {
        path: '/admin-dashboard/create-user',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><CreateUserForm/></Suspense>,
      },
      {
        path: '/admin-dashboard/all-user',
        element: <div>All User</div>
      },
    ]
  },

  // User Dashboard________________________________________________________________________
  {
    path: "/",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><UserAdminHomePage/></Suspense>,
    children: [
      {
        path: '/',
        element: <div>Main page outlate</div>
      },
      
    ]
  },
]);
// Route End __________________________________



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

