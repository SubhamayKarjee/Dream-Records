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
import UserProfile from './UserAdminDashboard/UserProfile/UserProfile';
import UpdateProfileInformation from './UserAdminDashboard/UserProfile/UserProfileComponents/UpdateProfileInformation';
import UserPassUpdateComponent from './UserAdminDashboard/UserProfile/UserProfileComponents/UserPassUpdateComponent';
import UserEmailUpdateComponent from './UserAdminDashboard/UserProfile/UserProfileComponents/UserEmailUpdateComponent';
import UserYoutubeOacRequestComponent from './UserAdminDashboard/UserProfile/UserProfileComponents/UserYoutubeOacRequestComponent';
import UserClaimReleaseComponent from './UserAdminDashboard/UserProfile/UserProfileComponents/UserClaimReleaseComponent';
import CreateMusicPage from './UserAdminDashboard/CreateMusicPage/CreateMusicPage';
import CreateMusicSecondStep from './UserAdminDashboard/CreateMusicPage/CreateMusicSecondStep';
import FirstStep from './UserAdminDashboard/CreateMusicPage/FirstStep';


// Commont Routes import_______________________________________________________________
const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const AdminLoginPage = React.lazy(() => import('./Authentication/LogIn/AdminLoginPage'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
// Admin Routes import__________________________________________________________________
const DashBoardForAdmin = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashBoardForAdmin'));
const CreateUserForm = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/CreateUserForm'));

// User Dashboard Routes import_________________________________________________________
const UserAdminHomePage = React.lazy(() => import('./UserAdminDashboard/UserAdminHomePage/UserAdminHomePage'));
const UserHomePage = React.lazy(() => import('./UserAdminDashboard/UserHomePage/UserHomePage'));
// User Profile Routes________________
const ProfileHomeComponents = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/ProfileHomeComponents'));



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
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserHomePage/></Suspense>
      },
      {
        path: '/create-music',
        element: <CreateMusicPage/>,
        children: [
          {
            path: '/create-music',
            element: <FirstStep/>
          },
          {
            path: '/create-music/tracks',
            element: <CreateMusicSecondStep/>
          }
          
        ]
      },
      //User Account Page _________________________________________________________________________________________
      {
        path: '/account',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserProfile/></Suspense>,
        children: [
          {
            path: '/account',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProfileHomeComponents/></Suspense>,
          },
          {
            path: '/account/update-profile-information',
            element: <UpdateProfileInformation/>
          },
          {
            path: '/account/change-password',
            element: <UserPassUpdateComponent/>
          },
          {
            path: '/account/change-email',
            element: <UserEmailUpdateComponent/>
          },
          {
            path: '/account/youtube-oac-request',
            element: <UserYoutubeOacRequestComponent/>
          },
          {
            path: '/account/youtube-claim-release',
            element: <UserClaimReleaseComponent/>
          },
        ]
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

