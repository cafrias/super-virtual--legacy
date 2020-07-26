import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CatalogPage from './CatalogPage/CatalogPage';
import ListPage from './ListPage/ListPage';
import ProfilePage from './ProfilePage/ProfilePage';
import Layout from '../components/Layout/Layout';

const Routes: React.FunctionComponent = () => (
  <Layout>
    <Switch>
      <Route path="/" exact>
        <CatalogPage />
      </Route>
      <Route path="/list">
        <ListPage />
      </Route>
      <Route>
        <ProfilePage />
      </Route>
    </Switch>
  </Layout>
);

export default Routes;
