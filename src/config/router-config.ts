import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";

const routers = [
  {
    path: '/',
    component: Home,
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