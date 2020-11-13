// import Home from '../views/home'
// import Car from '../views/car'
// import Home1 from '../views/home1'
// import Home2 from '../views/home2'

import Home from "../Pages/Home";

import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Details from "../Pages/Details";

let routers = [
{
  path: '/',
  component: Home,
  // children: [
  //   {
  //     path: '/home/tab1',
  //     component: Home1
  //   }, {
  //     path: '/home/tab2',
  //     component: Home2
  //   },
  // ]
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
      component: Details
    }
  ]
    },
]
export default routers