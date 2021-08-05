import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation';
import Comment from './components/Comment';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GetFighters from './components/GetFighters/getFighters';
import User from './components/User';
import { authenticate } from './store/session';
import './app.css'

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
    <div className="App">


    <BrowserRouter >
      <div className="App_nav_bar">
      <NavBar />
      </div>
        <div className="App_content">
      <Switch >

        <ProtectedRoute path='/fighters' exact={true} >
          <GetFighters/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute>
          {/* <0 */}
          <div  style={{height: '80%', width: '100%'}}
          >
          <h1 style={{height: '783px', width: '100%', lineHeight:'-8000px',backgroundSize: 'fill', backgroundImage: 'url(https://www.zurich.com/-/media/project/zurich/dotcom/media/magazine/2020/images/stage-construction-site.jpg?h=1250&la=en&w=2500&rev=131eb9d7dd544a998f988d6dc377594f&hash=E73E34B9EAE574B59321F090229F16A6)'}}>We're working on it!!!</h1>
          </div>
        </ProtectedRoute>

      </Switch>

    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
