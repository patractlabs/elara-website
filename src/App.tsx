import React, { FC, ReactElement, Suspense } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import  "./i18n";
import useRouter from "./core/hooks/useRouter";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import PageLoading from './pages/PageLoading'
import "./App.css";
import { ApiProvider } from './core/context/api';
import { useApi } from './core/hooks/useApi';
import { useTranslation } from 'react-i18next';
import { Language } from './core/enum';

const AuthRoute: FC<{
  component: FC;
  path: string;
}> = ({ component: Component, ...rest }): ReactElement => {
  const { isLogged } = useApi();
  const { location } = useRouter();
  
  return (
    <Route
      {...rest}
      render={ props =>
        isLogged ?
          <Component key={location.pathname} {...props} />
          :
          <Redirect to="/" />
      }
    />
  );
}

const App: FC = (): ReactElement => {
  const { i18n } = useTranslation();

  return (
    <ApiProvider>
      <div style={{ fontFamily: i18n.language === Language.en ? 'WorkSans' : 'PingFang SC' }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Suspense fallback={<PageLoading />}>
              <Route path="/" exact component={Home}></Route>
              <AuthRoute path="/dashboard" component={Dashboard} />
            </Suspense>
          </Switch>
        </BrowserRouter>
      </div>
    </ApiProvider>
  );
};

export default App;
