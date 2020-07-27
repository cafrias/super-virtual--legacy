import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CatalogPage from './CatalogPage/CatalogPage';
import ListPage from './ListPage/ListPage';
import ProfilePage from './ProfilePage/ProfilePage';
import Layout from '../components/Layout/Layout';
import LoginPage from './LoginPage/LoginPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

const Routes: React.FunctionComponent = () => (
  <Layout>
    <Switch>
      <Route path="/" exact>
        <CatalogPage />
      </Route>
      <Route path="/list">
        <ListPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  </Layout>
);

export default Routes;
