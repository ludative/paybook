import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './containers/sign-in';
import AdminCodes from "./containers/admin/codes";
import SignUp from './containers/sign-up';
import PayBooks from "./containers/payBooks";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PayBooks} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path={"/admin/codes"} component={AdminCodes}/>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
