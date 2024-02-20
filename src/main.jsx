import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Suspense } from 'react';
import LoadingComponentsForPage from './LoadingComponents/LoadingComponentsForPage';

const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
const DashBoardForAdmin = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashBoardForAdmin'))

// className='xl:max-w-[1140px] lg:max-w-[90%] md:max-w-[90%] sm:max-w-[90%] w-[95%] mx-auto'
// Route Start ________________________________
const router = createBrowserRouter([
  {
    path: "/",
    element: <div><p className='font-bold'>font-semibold</p></div>,
  },
  {
    path: "/log-in",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><LogIn/></Suspense>,
  },
  {
    path: "/sign-up/:email",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><SignUp/></Suspense>,
  },
  {
    path: "/admin-dashboard",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><DashBoardForAdmin/></Suspense>,
    children: [
      {
        path: '/admin-dashboard',
        element: <div>Mehedi Hasan</div>
      },
      {
        path: '/admin-dashboard/all-user',
        element: <div>All User</div>
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

