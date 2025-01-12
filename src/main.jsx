/* eslint-disable react-refresh/only-export-components */
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
import ProtectAdminRoute from './ProtectRoute/ProtectAdminRoute';
import ProtectUserRoute from './ProtectRoute/ProtectUserRoute';
import SetNewPassword from './Authentication/LogIn/SetNewPassword';
import UserPaymentHistory from './UserAdminDashboard/WalletPage/UserPaymentAndWithdrawalHIs/UserPaymentHistory';
import UserWithDrawalHIstory from './UserAdminDashboard/WalletPage/UserPaymentAndWithdrawalHIs/UserWithDrawalHIstory';




// Commont Routes import_______________________________________________________________
// ____________________________________________________________________________________
const LogIn = React.lazy(() => import('./Authentication/LogIn/LogIn'));
const ResetPassword = React.lazy(() => import('./Authentication/LogIn/ResetPassword'));
// const AdminLoginPage = React.lazy(() => import('./Authentication/LogIn/AdminLoginPage'));
const SignUp = React.lazy(() => import('./Authentication/SignUp/SignUp'));
// const SetPassword = React.lazy(() => import('./Authentication/SignUp/SetPassword/SetPassword'));
// Admin Routes import__________________________________________________________________
// _____________________________________________________________________________________
const DashBoardForAdmin = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashBoardForAdmin'));
const CreateUserForm = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/CreateUserForm'));
const DashbardHomePage = React.lazy(() => import('./AdminDashboard/DashboardForAdmin/DashbardHomePage'));
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
const AdminClaimReleasePage = React.lazy(() => import('./AdminDashboard/AdminClaimReleasePage/AdminClaimReleasePage'));
const AdminSupportPage = React.lazy(() => import('./AdminDashboard/AdminSupportPage/AdminSupportPage'));
const SupportAnsPage = React.lazy(() => import('./AdminDashboard/AdminSupportPage/SupportAnsPage'));
// Admin Setting Route__________________________________________________________________
const AdminSetting = React.lazy(() => import('./AdminDashboard/AdminSetting/AdminSetting'));
const NoticeDetailsPage = React.lazy(() => import('./AdminDashboard/AdminSetting/NoticeFromDreamRecord/NoticeDetailsPage'));
const AddGenreComponent = React.lazy(() => import('./AdminDashboard/AdminSetting/AddGenreComponent/AddGenreComponent'));
const AddLanguageComponent = React.lazy(() => import('./AdminDashboard/AdminSetting/AddLanguageComponent/AddLanguageComponent'));
const NoticeFromDreamRecord = React.lazy(() => import('./AdminDashboard/AdminSetting/NoticeFromDreamRecord/NoticeFromDreamRecord'));
const MonthlyBasedWithdraw = React.lazy(() => import('./AdminDashboard/AdminSetting/MonthlyBasedWithdraw/MonthlyBasedWithdraw'));
const AdvertismentComponent = React.lazy(() => import('./AdminDashboard/AdminSetting/AdvertismentComponent/AdvertismentComponent'));
// Admin Profile Route__________________________________________________________________
const AdminProfile = React.lazy(() => import('./AdminDashboard/AdminProfile/AdminProfile'));
const AdminProfileInformationUpdate = React.lazy(() => import('./AdminDashboard/AdminProfile/AdminProfileUpdateComponent/AdminProfileInformationUpdate'));
const AdminEmailUpdate = React.lazy(() => import('./AdminDashboard/AdminProfile/AdminProfileUpdateComponent/AdminEmailUpdate'));
const AdminPasswordUpdate = React.lazy(() => import('./AdminDashboard/AdminProfile/AdminProfileUpdateComponent/AdminPasswordUpdate'));

// User Dashboard Routes import_________________________________________________________
// _____________________________________________________________________________________
const UserLockedPage = React.lazy(() => import('./UserAdminDashboard/UserCommonComponent/UserLockedPage'));
const UserAdminHomePage = React.lazy(() => import('./UserAdminDashboard/UserAdminHomePage/UserAdminHomePage'));
const UserHomePage = React.lazy(() => import('./UserAdminDashboard/UserHomePage/UserHomePage'));
// User Profile Route___________________________________________________________________
const UserProfile = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfile'));
const UpdateProfileInformation = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UpdateProfileInformation'));
const UserPassUpdateComponent = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UserPassUpdateComponent'));
const UserEmailUpdateComponent = React.lazy(() => import('./UserAdminDashboard/UserProfile/UserProfileComponents/UserEmailUpdateComponent'));
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
const CreateArtistPage = React.lazy(() => import('./UserAdminDashboard/UserArtistPage/CreateArtistPage'));
const UpdateArtistPage = React.lazy(() => import('./UserAdminDashboard/UserArtistPage/UpdateArtistPage'));
const DetailsSingleArtist = React.lazy(() => import('./UserAdminDashboard/UserArtistPage/DetailsSingleArtist'));
// Labels Route_________________________________________________________________________
const UserLabelsPage = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/UserLabelsPage'));
const CreateLabelPage = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/CreateLabelPage'));
const UpdateLabelPage = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/UpdateLabelPage'));
const DetailsSingleLabels = React.lazy(() => import('./UserAdminDashboard/UserLabelPage/DetailsSingleLabels'));
// Wallet Route_________________________________________________________________________
const WalletPage = React.lazy(() => import('./UserAdminDashboard/WalletPage/WalletPage'));
// Claim Release Route__________________________________________________________________
const ClaimReleasePage = React.lazy(() => import('./UserAdminDashboard/ClaimReleasePage/ClaimReleasePage'));
// Analytics Route______________________________________________________________________
const AnalyticsPage = React.lazy(() => import('./UserAdminDashboard/AnalyticsPage/AnalyticsPage'));
// Support Route________________________________________________________________________
const SupportPage = React.lazy(() => import('./UserAdminDashboard/SupportPage/SupportPage'));
const SingleSupportPage = React.lazy(() => import('./UserAdminDashboard/SupportPage/SingleSupportPage'));
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
    path: "/reset-password",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><ResetPassword/></Suspense>,
  },
  {
    path: "/action",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><SetNewPassword/></Suspense>,
  },
  {
    path: "/sign-up/:id",
    loader: ({ params }) => axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${params.id}`),
    element: <Suspense fallback={<LoadingComponentsForPage/>}><SignUp/></Suspense>,
  },
  // {
  //   path: "/set-password/:id",
  //   loader: ({ params }) => axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${params.id}`),
  //   element: <Suspense fallback={<LoadingComponentsForPage/>}><SetPassword/></Suspense>,
  // },
  // Admin Dashboard________________________________________________________________________
  //________________________________________________________________________________________
  {
    path: "/admin-dashboard",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><ProtectAdminRoute><DashBoardForAdmin/></ProtectAdminRoute></Suspense>,
    children: [
      {
        path: '/admin-dashboard',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><DashbardHomePage/></ProtectAdminRoute></Suspense>
      },
      {
        path: '/admin-dashboard/create-user',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><CreateUserForm/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/all-user/:pageNumber/:perPageUser',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><UsersList/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/user/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><SingleUserPage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/release/:pageNumber/:perPageRelease/:status',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminReleasePage/></ProtectAdminRoute></Suspense>
      },
      {
        path: '/admin-dashboard/release/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminSingleReleasePage/></ProtectAdminRoute></Suspense>
      },
      {
        path: '/admin-dashboard/release/updated-status',
        element: <SuccessPage link={'/admin-dashboard/release/1/10/All'} heading={'Successfully Updated Release Status'} text={'Now user can see Updated Status her Release'}/>
      },
      {
        path: '/admin-dashboard/labels/:pageNumber/:perPageLabel/:status',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminLabelsPage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/labels/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><UpdateLabelsComponent/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/artist/:pageNumber/:perPageAritst',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminArtistPage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/artist/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><SingleArtistForAdmin/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/withdrawal-request/:pageNumber/:perPageList/:status',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminWithdrawalPage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/withdrawal-request/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><SingleWithdrawalDetails/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/claim-release/:pageNumber/:perPageList/:status',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminClaimReleasePage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/support/:status/:pageNumber/:perPageSupport',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminSupportPage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/support/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><SupportAnsPage/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/settings',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminSetting/></ProtectAdminRoute></Suspense>,
        children: [
          {
            path: '/admin-dashboard/settings',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AddGenreComponent/></Suspense>
          },
          {
            path: '/admin-dashboard/settings/language',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AddLanguageComponent/></Suspense>
          },
          {
            path: '/admin-dashboard/settings/advertisment',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><AdvertismentComponent/></Suspense>
          },
          {
            path: '/admin-dashboard/settings/notice',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><NoticeFromDreamRecord/></Suspense>
          },
          {
            path: '/admin-dashboard/settings/withdraw',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><MonthlyBasedWithdraw/></Suspense>
          },
        ]
      },
      {
        path: '/admin-dashboard/notice-details/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><NoticeDetailsPage/></ProtectAdminRoute></Suspense>,
      },
      //Admin Account/Profile Page _________________________________________________________________________________________
      {
        path: '/admin-dashboard/account',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminProfile/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/edit-profile/:id',
        loader: ({ params }) => axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${params.id}`),
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminProfileInformationUpdate/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/email-update',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminEmailUpdate/></ProtectAdminRoute></Suspense>,
      },
      {
        path: '/admin-dashboard/password-update',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectAdminRoute><AdminPasswordUpdate/></ProtectAdminRoute></Suspense>,
      },
    ]
  },

  // User Dashboard_____________________________________________________________________________________________________
  //____________________________________________________________________________________________________________________
  {
    path: "/",
    element: <Suspense fallback={<LoadingComponentsForPage/>}><ProtectUserRoute><UserAdminHomePage/></ProtectUserRoute></Suspense>,
    children: [
      {
        path: '/',
        // element: <ProtectUserRoute></ProtectUserRoute>
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UserHomePage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/releases/:status/:pageNumber/:perPageRelease',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><ReleasesPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/releases/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><SingleReleasePage/></ProtectUserRoute></Suspense>
      },
      {
        // Create Release _________________________________________________________________________________________________
        path: '/create-release',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><CreateMusicPage/></ProtectUserRoute></Suspense>,
        children: [
          {
            path: '/create-release',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><FirstStep/></ProtectUserRoute></Suspense>,
          },
          {
            path: '/create-release/tracks',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><SecondStepTrack/></ProtectUserRoute></Suspense>,
          },
          {
            path: '/create-release/date',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><ThirdStepDate/></ProtectUserRoute></Suspense>,
          },
          {
            path: '/create-release/thenks',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SuccessPage link={'/releases/Pending/1/6'} heading={'Successfully Created the Release'} text={'We will review your release very soon. Please Go to the Release page and check your Release Status'}/></Suspense>,
          }
          
        ]
      },
      {
        // Edit Release _________________________________________________________________________________________________
        path: '/releases/edit/',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><EditReleaseMainPage/></ProtectUserRoute></Suspense>,
        children: [
          {
            path: '/releases/edit/:id',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><EditReleaseFirstStep/></ProtectUserRoute></Suspense>,
          },
          {
            path: '/releases/edit/second-step',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><EditReleaseSecondStep/></ProtectUserRoute></Suspense>,
          },
          {
            path: '/releases/edit/third-step',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><EditReleaseThirdStep/></ProtectUserRoute></Suspense>,
          },
          {
            path: '/releases/edit/thanks',
            element: <Suspense fallback={<LoadingComponentsInsidePage/>}><SuccessPage link={'/releases/ReSubmitted/1/6'} heading={'Successfully Updated the Release'} text={'We will review your release very soon. Please Go to the Release page and check your Release Status'}/></Suspense>,
          },
        ]
      },
      // Artist Page Link __________________________________________________________________________
      {
        path: '/artist/:pageNumber/:perPageArtist',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UserArtistPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/create-artist',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><CreateArtistPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/update-artist/:id',
        loader: ({ params }) => axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/artist/single-artist/${params.id}`),
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UpdateArtistPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/artist/:id/:status/:pageNumber/:perPageArtist',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><DetailsSingleArtist/></ProtectUserRoute></Suspense>
      },
      // Label Page Link __________________________________________________________________________
      {
        path: '/labels/:status/:pageNumber/:perPageLabels',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UserLabelsPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/create-labels',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><CreateLabelPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/update-labels/:id',
        loader: ({ params }) => axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/labels/single-labels/${params.id}`),
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UpdateLabelPage/></ProtectUserRoute></Suspense>
      },
      {
        path: '/labels/:id/:status/:pageNumber/:perPageLabels',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><DetailsSingleLabels/></ProtectUserRoute></Suspense>
      },
      {
        path: '/analytics/:pageNumber/:perPageAnalytics',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><AnalyticsPage/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/wallet',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><WalletPage/></ProtectUserRoute></Suspense>,
        children: [
          {
            path:'/wallet/payment/:pageNumber/:perPagePaymentList',
            element: <UserPaymentHistory/>
          },
          {
            path:'/wallet/withdrawal/:pageNumber/:perPageWithdrawalList',
            element: <UserWithDrawalHIstory/>
          }
        ]
      },
      {
        path: '/claim-release/:status/:pageNumber/:perPageRights',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><ClaimReleasePage/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/support/:status/:pageNumber/:perPageSupport',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><SupportPage/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/support/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><SingleSupportPage/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/notice/:id',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><NoticeDetailsPage/></ProtectUserRoute></Suspense>,
      },
      //User Account/Profile Page _________________________________________________________________________________________
      {
        path: '/account',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UserProfile/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/edit-profile/:id',
        loader: ({ params }) => axios.get(`https://shark-app-65c5t.ondigitalocean.app/api/v1/users/${params.id}`),
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UpdateProfileInformation/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/email-update',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UserEmailUpdateComponent/></ProtectUserRoute></Suspense>,
      },
      {
        path: '/password-update',
        element: <Suspense fallback={<LoadingComponentsInsidePage/>}><ProtectUserRoute><UserPassUpdateComponent/></ProtectUserRoute></Suspense>,
      },
    ]
  },
  {
    path: '/locked/:id',
    element: <Suspense fallback={<LoadingComponentsInsidePage/>}><UserLockedPage/></Suspense>,
  },
]);
// Route End __________________________________



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster/>
  </React.StrictMode>
);

