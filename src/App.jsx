import React, { Suspense,useEffect } from "react";
// import config from "./router/config";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { message } from "antd";
// import { BrowserRouter } from "react-router-dom";
// import { renderRoutes } from "react-router-config";
import  "./i18n";

import userCounterModel from "./Pages/Hox/User";

import useRouter from "./Pages/Hooks/useRouter";

import Home from "./Pages/Home";
import Header from "./Pages/Header";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PageLoading from './Pages/PageLoading'

import "./App.css";

function AuthRoute({ component: Component, ...rest }) {
  const userInfo = userCounterModel();
  const { location } = useRouter();

  // useEffect(()=>{
  //   if (userInfo.login === false) {
  //     message.warning("请登录");
  //   }
  // },[])
  
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo.login === true ? (
          <Component key={location.pathname} {...props} />
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  );
}

const App = (props) => {
  return (
    <div>
      <HashRouter>
        <Header />
        <Switch>

          <Suspense fallback={<PageLoading />}>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <AuthRoute path="/dashboard" component={Dashboard} />
          </Suspense>
          {/* <Route path="/dashboard" component={Dashboard}></Route> */}
        </Switch>
      </HashRouter>
      {/* <BrowserRouter>
        <Header />
        {renderRoutes(config)}
      </BrowserRouter> */}
    </div>
  );
};

export default App;
