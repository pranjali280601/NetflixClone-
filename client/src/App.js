import React,{ useEffect } from 'react';

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Provider } from "react-redux"
import { useDispatch } from "react-redux"

import { userAction } from './Redux/Reducer/user/user.action'
import store from "./Redux/store"

import Home from "./components/screens/Home"
import Signin from "./components/screens/Signin"
import Signup from "./components/screens/Signup"
import PaymentStatus from "./components/PaymentStatus"
import Step1 from "./components/screens/Step1"
import Step11 from "./components/screens/Step11"
import Step2 from "./components/screens/Step2"
import Step3 from "./components/screens/Step3"
import Pricing from "./components/screens/Pricing"
import Profiles from "./components/screens/Profiles"
import SubscribePlan from './components/screens/SubscribePlan'
import ForgotPassword from './components/screens/ForgotPassword'
import NewPassword from './components/screens/NewPassword'
import Movies from './components/screens/Movies'
import TVShows from './components/screens/TVShows'
import NewnPopular from './components/screens/NewnPopular'



import './App.css'



const Routing=()=>{
  const history = useHistory()
  const dispatch = useDispatch()


  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch(userAction(user))
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push("/signup")
      
    }
  },[])

  return (
    
      <Switch>
      <Route exact path="/signin">
      <Signin />
      </Route>
      <Route exact path="/forgotpassword">
        <ForgotPassword />
        </Route>
        <Route exact path="/reset/:token">
      <NewPassword />
      </Route>
      <Route exact path="/subscribePlan">
      <SubscribePlan />
      </Route>
      <Route exact path="/signup">
      <Signup />
      </Route>
      <Route exact path="/">
        <Signup />
      </Route>
      <Route exact path="/step1">
        <Step1 />
      </Route>
      <Route exact path="/step11">
        <Step11 />
      </Route>
      <Route exact path="/step2">
        <Step2 />
      </Route>
      <Route exact path="/step3/:amount">
        <Step3 />
      </Route>
      <Route exact path="/pricing">
        <Pricing />
      </Route>
        <Route exact path="/Home">
        <Home />
        </Route>
        <Route exact path="/movies">
        <Movies />
        </Route>
        <Route exact path="/tvshows">
        <TVShows />
        </Route>
        <Route exact path="/newnpopular">
        <NewnPopular />
        </Route>
        <Route exact path="/profiles">
        <Profiles />
        </Route>
        <Route exact path="/payment/status/:paymentId">
        <PaymentStatus />
        </Route>
      
      
      </Switch>

  )
}



function App() {
 
  return (
    <Provider store = {store}>
    <BrowserRouter>
    <Routing/>
    </BrowserRouter>
    </Provider>
 
  );
}



export default App;
