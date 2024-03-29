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

// Commont Routes import_______________________________________________________________
// ____________________________________________________________________________________
const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const AdminLoginPage = React.lazy(() => import('./Authentication/LogIn/AdminLoginPage'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
// Admin Routes import__________________________________________________________________
// _____________________________________________________________________________________
const DashBoardForAdmin = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashBoardForAdmin'));
const CreateUserForm = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/CreateUserForm'));
const UsersList = React.lazy(() => import('./AdminDashboard/UsersList/UsersList'));
const SingleUserPage = React.lazy(() => import('./AdminDashboard/UsersList/SingleUserPage'));
const AdminReleasePage = React.lazy(() => import('./AdminDashboard/AdminReleases/AdminReleasePage'));
const AdminSingleReleasePage = React.lazy(() => import('./AdminDashboard/AdminReleases/AdminSingleReleasePage'));
const AdminLabelsPage = React.lazy(() => import('./AdminDashboard/AdminLabelsPage/AdminLabelsPage'));
const UpdateLabelsComponent = React.lazy(() => import('./AdminDashboard/AdminLabelsPage/UpdateLabelsComponent'));
const AdminArtistPage = React.lazy(() => import('./AdminDashboard/AdminArtistPage/AdminArtistPage'));
const SingleArtistForAdmin = React.lazy(() => import('./AdminDashboard/AdminArtistPage/SingleArtistForAdmin'));
const AdminWithdrawalPage = React.lazy(() => import('./AdminDashboard/AdminWithdrawalPage/AdminWithdrawalPage'));
const SingleWithdrawalDetails = React.lazy(() => import('./AdminDashboard/AdminWithdrawalPage/SingleWithdrawalDetails'));
// Admin Setting Route__________________________________________________________________
const AdminSetting = React.lazy(() => import('./AdminDashboard/AdminSetting/AdminSetting'));
// User Dashboard Routes import_________________________________________________________
// _____________________________________________________________________________________
const UserAdminHomePage = React.lazy(() => import('./UserAdminDashboard/UserAdminHomePage/UserAdminHomePage'));
const UserHomePage = React.lazy(() => import('./UserAdminDashboard/UserHomePage/UserHomePage'));
// User Profile Route___________________________________________________________________
const ProfileHomeComponents = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/ProfileHomeComponents'));
const UserProfile = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfile'));
const UpdateProfileInformation = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UpdateProfileInformation'));
const UserPassUpdateComponent = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UserPassUpdateComponent'));
const UserEmailUpdateComponent = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UserEmailUpdateComponent'));
const UserYoutubeOacRequestComponent = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UserYoutubeOacRequestComponent'));
const UserClaimReleaseComponent = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UserClaimReleaseComponent'));
// Release Route________________________________________________________________________
const ReleasesPage = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/ReleasesPage'));
const CreateMusicPage = React.lazy(() => import('./UserAdminDashboard/CreateMusicPage/CreateMusicPage'));
const FirstStep = React.lazy(() => import('./UserAdminDashboard/CreateMusicPage/FirstStep'));
const SecondStepTrack = React.lazy(() => import('./UserAdminDashboard/CreateMusicPage/SecondStepTrack'));
const ThirdStepDate = React.lazy(() => import('./UserAdminDashboard/CreateMusicPage/ThirdStepDate'));
const EditReleaseMainPage = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseMainPage'));
const EditReleaseFirstStep = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseFirstStep'));
const EditReleaseSecondStep = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseSecondStep'));
const EditReleaseThirdStep = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/EditReleasePage/EditReleaseThirdStep'));
const SingleReleasePage = React.lazy(() => import('./UserAdminDashboard/ReleasesPage/SingleReleasePage/SingleReleasePage'));
// Artist Route_________________________________________________________________________
const UserArtistPage = React.lazy(() => import('./UserAdminDashboard/UserArtistPage/UserArtistPage'));
const DetailsSingleArtist = React.lazy(() => import('./UserAdminDashboard/UserArtistPage/DetailsSingleArtist'));
// Labels Route_________________________________________________________________________
const UserLabelsPage = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/UserLabelsPage'));
const DetailsSingleLabels = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/DetailsSingleLabels'));
// Wallet Route_________________________________________________________________________
const WalletPage = React.lazy(() => import('./UserAdminDashboard/WalletPage/WalletPage'));
// Analytics Route______________________________________________________________________
const AnalyticsPage = React.lazy(() => import('./UserAdminDashboard/AnalyticsPage/AnalyticsPage'));
// Support Route________________________________________________________________________
const SupportPage = React.lazy(() => import('./UserAdminDashboard/SupportPage/SupportPage'));
// Success Route________________________________________________________________________
const SuccessPage = React.lazy(() => import('./UserAdminDashboard/SuccessPage/SuccessPage'));


// Route Start _________________________________________________________________________
//______________________________________________________________________________________
const router = createBrowserRouter([
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
  //________________________________________________________________________________________
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
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UsersList/></Suspense>,
      },
      {
        path: '/admin-dashboard/user/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SingleUserPage/></Suspense>,
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
        path: '/admin-dashboard/release/updated-status',
        element: <SuccessPage link={'/admin-dashboard/release'} heading={'Successfully Updated Release Status'} text={'Now user can see Updated Status her Release'}/>
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
        path: '/admin-dashboard/artist',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminArtistPage/></Suspense>,
      },
      {
        path: '/admin-dashboard/artist/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SingleArtistForAdmin/></Suspense>,
      },
      {
        path: '/admin-dashboard/withdrawal-request/',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminWithdrawalPage/></Suspense>,
      },
      {
        path: '/admin-dashboard/withdrawal-request/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SingleWithdrawalDetails/></Suspense>,
      },
      {
        path: '/admin-dashboard/settings',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdminSetting/></Suspense>,
      },
    ]
  },

  // User Dashboard_____________________________________________________________________________________________________
  //____________________________________________________________________________________________________________________
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
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><CreateMusicPage/></Suspense>,
        children: [
          {
            path: '/create-release',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><FirstStep/></Suspense>,
          },
          {
            path: '/create-release/tracks',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SecondStepTrack/></Suspense>,
          },
          {
            path: '/create-release/date',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ThirdStepDate/></Suspense>,
          },
          {
            path: '/create-release/thenks',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SuccessPage link={'/releases'} heading={'Successfully Created the Release'} text={'We will review your release very soon. Please Go to the Release page and check your Release Status'}/></Suspense>,
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
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><EditReleaseFirstStep/></Suspense>,
          },
          {
            path: '/releases/edit/second-step',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><EditReleaseSecondStep/></Suspense>,
          },
          {
            path: '/releases/edit/third-step',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><EditReleaseThirdStep/></Suspense>,
          },
          {
            path: '/releases/edit/thanks',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SuccessPage link={'/releases'} heading={'Successfully Updated the Release'} text={'We will review your release very soon. Please Go to the Release page and check your Release Status'}/></Suspense>,
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
      {
        path: '/analytics',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AnalyticsPage/></Suspense>,
      },
      {
        path: '/wallet',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><WalletPage/></Suspense>,
      },
      {
        path: '/support',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SupportPage/></Suspense>,
      },
      {
        path: '/support/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}>Single Support</Suspense>,
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
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UpdateProfileInformation/></Suspense>,
          },
          {
            path: '/account/change-password',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserPassUpdateComponent/></Suspense>,
          },
          {
            path: '/account/change-email',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserEmailUpdateComponent/></Suspense>,
          },
          {
            path: '/account/youtube-oac-request',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserYoutubeOacRequestComponent/></Suspense>,
          },
          {
            path: '/account/youtube-claim-release',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserClaimReleaseComponent/></Suspense>,
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

