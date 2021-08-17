import "./App.css";

import React, { FC, ReactElement, Suspense, useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import "./i18n";
import useRouter from "./core/hooks/useRouter";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import PageLoading from "./pages/PageLoading";
import { ApiProvider } from "./core/context/api";
import { useApi } from "./core/hooks/useApi";
import { useTranslation } from "react-i18next";
import { Language } from "./core/enum";
import { DashboardProvider } from "./core/context/dashboard-context";

const AuthRoute: FC<{
  component: FC;
  path: string;
}> = ({ component: Component, ...rest }): ReactElement => {
  const { isLogged } = useApi();
  const { location } = useRouter();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          <Component key={location.pathname} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const App: FC = (): ReactElement => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.language = i18n.language.toLowerCase().includes("zh")
      ? Language.zh
      : Language.en;
    console.log("lang", i18n.language);
  }, [i18n]);

  return (
    <ApiProvider>
      <div
        style={{
          fontFamily:
            i18n.language === Language.zh ? 'PingFang SC' : 'WorkSans',
        }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Suspense fallback={<PageLoading />}>
              <Route path="/" exact component={Home}></Route>
              <DashboardProvider>
                <AuthRoute path="/dashboard" component={Dashboard} />
              </DashboardProvider>
            </Suspense>
          </Switch>
        </BrowserRouter>
      </div>
    </ApiProvider>
  )
};

export default App;
