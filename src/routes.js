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
import FormLayout from "layouts/form/FormLayout";
import TicketLayout from "layouts/Ticket/TicketLayout";

const routes = window.localStorage.getItem('accessToken') && window.localStorage.getItem('role') == 1 && window.localStorage.getItem('users') == 1 ? [
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
    name: "Station",
    key: "station",
    icon: <Icon fontSize="small">home_work</Icon>,
    route: "/station/*",
    component: <StationRoutes />,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/ticket/*",
    component: <TicketLayout />,
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
    name: "Accounts",
    key: "accounts",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/accounts/*",
    component: <AccountLayout />,
  },
  // {
  //   type: "collapse",
  //   name: "Form",
  //   key: "Form",
  //   icon: <Icon fontSize="small">settings</Icon>,
  //   route: "/setting/*",
  //   component: <FormLayout />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
] : window.localStorage.getItem('accessToken') && window.localStorage.getItem('role') == 1 && window.localStorage.getItem('users') == 0 ? [
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
    name: "Station",
    key: "station",
    icon: <Icon fontSize="small">home_work</Icon>,
    route: "/station/*",
    component: <StationRoutes />,
  },
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
  //   name: "Form",
  //   key: "Form",
  //   icon: <Icon fontSize="small">settings</Icon>,
  //   route: "/setting/*",
  //   component: <FormLayout />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
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
    name: "Station",
    key: "station",
    icon: <Icon fontSize="small">home_work</Icon>,
    route: "/station/*",
    component: <StationRoutes />,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/ticket/*",
    component: <TicketLayout />,
  },
  {
    type: "collapse",
    name: "Record",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/record/*",
    component: <RecordLayout />,
  },
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
window.localStorage.getItem('form') == 1 && routes.push({
  type: "collapse",
  name: "Form",
  key: "Form",
  icon: <Icon fontSize="small">settings</Icon>,
  route: "/setting/*",
  component: <FormLayout />,
})
export default routes;
