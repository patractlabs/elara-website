import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";

const routers = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
    // auth:true
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/Details',
        component: Details,
      }
    ]
  },
]
export default routers