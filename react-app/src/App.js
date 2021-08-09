import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation';
import Comment from './components/Comment';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GetFighters from './components/GetFighters/getFighters';
import UserList from './components/UserList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/splashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter >
      <NavBar  />

      <Switch >
{/*
        <ProtectedRoute path='/fighters' exact={true} >
          <GetFighters/>
        </ProtectedRoute> */}

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/users' exact={true} >
          <UserList />
        </ProtectedRoute>

        <SplashPage path='/' exact={true} />


      </Switch>

    </BrowserRouter>

  );
}

export default App;
