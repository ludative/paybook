import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './containers/sign-in';
import SignUp from './containers/sign-up';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in">
          <SignIn/>
        </Route>
        <Route path="/sign-up">
          <SignUp/>
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}