import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';

import RemindersPage from './components/RemindersPage/RemindersPage';
import SettingsPage from './components/Settings/Settings';
import AddOwnerPage from './components/AddOwnerPage/AddOwnerPage';
import OwnerProfilePage from './components/OwnerProfilePage/OwnerProfilePage';
import AddPetPage from './components/AddPetPage/AddPetPage';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route 
          path="/reminders"
          component={RemindersPage}
        />
        <Route 
          path="/settings"
          component={SettingsPage}
        />
        <Route
          path="/addOwner"
          component={AddOwnerPage}
        />
        <Route
          path="/ownerProfile"
          component={OwnerProfilePage}
        />
        <Route
          path="/addPet"
          component={AddPetPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
        
      </Switch>
    </Router>
  </div>
);

export default App;
