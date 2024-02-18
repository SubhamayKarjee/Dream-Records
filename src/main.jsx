import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
import { Suspense } from 'react';
import LoadingComponentsForPage from './LoadingComponents/LoadingComponentsForPage';

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
]);
// Route End __________________________________



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

