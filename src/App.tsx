import React, { FC, ReactElement, Suspense } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import  "./i18n";

import userCounterModel from "./pages/Hox/User";

import useRouter from "./core/hooks/useRouter";

import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageLoading from './pages/PageLoading'

import "./App.css";

const AuthRoute: FC<{
  component: FC;
  path: string;
}> = ({ component: Component, ...rest }): ReactElement => {
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
      render={ props =>
        userInfo.login === true ?
          <Component key={location.pathname} {...props} />
          :
          <Redirect to="/login" />
      }
    />
  );
}

const App: FC = (): ReactElement => {
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
