// Material Dashboard 2 React layouts
// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import AccountLayout from "layouts/accounts/AccountLayout";
import StationRoutes from "layouts/station/StationRoutes";
import MapLayout from "layouts/map/MapLayout";
import RecordLayout from "layouts/Record/RecordLayout";

const routes = window.localStorage.getItem('accessToken') && window.localStorage.getItem('role') == 1 ? [
  {
    type: "collapse",
    name: "Map",
    key: "map",
    icon: <Icon fontSize="small">my_location</Icon>,
    route: "/map/*",
    component: <MapLayout />,
  },
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  {
    type: "collapse",
    name: "Record",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/record/*",
    component: <RecordLayout />,
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Station",
    key: "station",
    icon: <Icon fontSize="small">home_work</Icon>,
    route: "/station/*",
    component: <StationRoutes />,
  },
  {
    type: "collapse",
    name: "Accounts",
    key: "accounts",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/accounts/*",
    component: <AccountLayout />,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
] : window.localStorage.getItem('accessToken') ? [
  {
    type: "collapse",
    name: "Map",
    key: "map",
    icon: <Icon fontSize="small">my_location</Icon>,
    route: "/map/*",
    component: <MapLayout />,
  },
  {
    type: "collapse",
    name: "Record",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/record/*",
    component: <RecordLayout />,
  },
  {
    type: "collapse",
    name: "Station",
    key: "station",
    icon: <Icon fontSize="small">home_work</Icon>,
    route: "/station/*",
    component: <StationRoutes />,
  }
] : [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
]

export default routes;
