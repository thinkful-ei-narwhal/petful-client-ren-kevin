import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header.js';
import Homepage from '../../routes/Homepage/Homepage.js';
import Adoption from '../../routes/Adoption/Adoption.js';
import Cats from '../../routes/Cats/Cats.js';
import Dogs from '../../routes/Dogs/Dogs.js';

export default class Root extends Component {
  render() {
    return (
      <div className="root">
        <header>
          <Route path="/" component={Header} />
        </header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path={'/adoption'} component={Adoption} />
          <Route path={'/cats'} component={Cats} />
          <Route path={'/dogs'} component={Dogs} />
        </Switch>
      </div>
    );
  }
}
