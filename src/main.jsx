import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
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
import FirstStep from './UserAdminDashboard/CreateMusicPage/FirstStep';
import ThirdStepDate from './UserAdminDashboard/CreateMusicPage/ThirdStepDate';
import SuccessPage from './UserAdminDashboard/SuccessPage/SuccessPage';
import SecondStepTrack from './UserAdminDashboard/CreateMusicPage/SecondStepTrack';
import EditReleaseFirstStep from './UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseFirstStep';
import EditReleaseSecondStep from './UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseSecondStep';
import EditReleaseThirdStep from './UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseThirdStep';
import DetailsSingleArtist from './UserAdminDashboard/UserArtistPage/DetailsSingleArtist';





// Commont Routes import_______________________________________________________________
const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const AdminLoginPage = React.lazy(() => import('./Authentication/LogIn/AdminLoginPage'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
// Admin Routes import__________________________________________________________________
const DashBoardForAdmin = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashBoardForAdmin'));
const CreateUserForm = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/CreateUserForm'));
const AdminReleasePage = React.lazy(() => import('./AdminDashboard/AdminReleases/AdminReleasePage'));
const AdminSingleReleasePage = React.lazy(() => import('./AdminDashboard/AdminReleases/AdminSingleReleasePage'));
const AdminLabelsPage = React.lazy(() => import('./AdminDashboard/AdminLabelsPage/AdminLabelsPage'));
const UpdateLabelsComponent = React.lazy(() => import('./AdminDashboard/AdminLabelsPage/UpdateLabelsComponent'));

const AdminSetting = React.lazy(() => import('./AdminDashboard/AdminSetting/AdminSetting'));


// User Dashboard Routes import_________________________________________________________
const UserAdminHomePage = React.lazy(() => import('./UserAdminDashboard/UserAdminHomePage/UserAdminHomePage'));
const UserHomePage = React.lazy(() => import('./UserAdminDashboard/UserHomePage/UserHomePage'));
const UserArtistPage = React.lazy(() => import('./UserAdminDashboard/UserArtistPage/UserArtistPage'));
const UserLabelsPage = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/UserLabelsPage'));
const DetailsSingleLabels = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/DetailsSingleLabels'));
const ReleasesPage = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/ReleasesPage'));
const SingleReleasePage = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/SingleReleasePage/SingleReleasePage'));
const EditReleaseMainPage = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseMainPage'));


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
      {
        path: '/admin-dashboard/release',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminReleasePage/></Suspense>
      },
      {
        path: '/admin-dashboard/release/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminSingleReleasePage/></Suspense>
      },
      {
        path: '/admin-dashboard/labels',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminLabelsPage/></Suspense>,
      },
      {
        path: '/admin-dashboard/labels/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UpdateLabelsComponent/></Suspense>,
      },
      {
        path: '/admin-dashboard/settings',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminSetting/></Suspense>,
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
        path: '/releases',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ReleasesPage/></Suspense>
      },
      {
        path: '/releases/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SingleReleasePage/></Suspense>
      },
      {
        // Create Release _________________________________________________________________________________________________
        path: '/create-release',
        element: <CreateMusicPage/>,
        children: [
          {
            path: '/create-release',
            element: <FirstStep/>
          },
          {
            path: '/create-release/tracks',
            element: <SecondStepTrack/>
          },
          {
            path: '/create-release/date',
            element: <ThirdStepDate/>
          },
          {
            path: '/create-release/thenks',
            element: <SuccessPage link={'/releases'} heading={'Successfully Created the Release'} text={'We will review your release very soon. Please Go to the Release page and check your Release Status'}/>
          }
          
        ]
      },
      {
        // Edit Release _________________________________________________________________________________________________
        path: '/releases/edit/',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><EditReleaseMainPage/></Suspense>,
        children: [
          {
            path: '/releases/edit/:id',
            element: <EditReleaseFirstStep/>,
          },
          {
            path: '/releases/edit/second-step',
            element: <EditReleaseSecondStep/>,
          },
          {
            path: '/releases/edit/third-step',
            element: <EditReleaseThirdStep/>,
          },
          {
            path: '/releases/edit/thanks',
            element: <SuccessPage link={'/releases'} heading={'Successfully Updated the Release'} text={'We will review your release very soon. Please Go to the Release page and check your Release Status'}/>,
          },
        ]
      },
      {
        path: '/artist',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserArtistPage/></Suspense>
      },
      {
        path: '/artist/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><DetailsSingleArtist/></Suspense>
      },
      {
        path: '/labels',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserLabelsPage/></Suspense>
      },
      {
        path: '/labels/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><DetailsSingleLabels/></Suspense>
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
    <Toaster/>
  </React.StrictMode>
);

