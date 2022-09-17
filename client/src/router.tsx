import React, { useEffect, useContext } from "react";
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";
import Components from "./component";
import Table from "./Table";
import ErrorPage from "./ErrPage";
import StaticError from "./StaticError";
import PerformanceTest from "./PerformanceTest";
export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Components />} />
        <Route exact path={"/table"} component={Table} />
        <Route exact path={"/errorPage"} component={ErrorPage} />
        <Route exact path={"/staticError"} component={StaticError} />
        <Route exact path={"/PerformanceTest"} component={PerformanceTest} />
      </Switch>
    </HashRouter>
  );
};
