import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './containers/sign-in';
import AdminCodes from "./containers/admin/codes";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in">
          <SignIn/>
        </Route>
        <Route path={"/admin/codes"}>
          <AdminCodes/>
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
