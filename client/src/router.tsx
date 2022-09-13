import React, { useEffect, useContext } from "react";
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";
import Components from "./component";
import Table from "./Table";
export default () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Components />} />
        <Route exact path={"/table"} component={Table} />
        {/* <Route exact path={"/update-pwd"} component={UpdatePwd} /> */}
      </Switch>
    </HashRouter>
  );
};
