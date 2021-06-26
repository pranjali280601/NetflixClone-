import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from "./components/screens/Home"
import Payments from "./components/screens/payments"
import {reducer,initialState } from './reducers/userReducer.js'
import Signin from "./components/screens/Signin"
import Signup from "./components/screens/Signup"
import PaymentStatus from "./components/PaymentStatus"
import Step1 from "./components/screens/Step1"
import Step11 from "./components/screens/Step11"
import Step2 from "./components/screens/Step2"
import Step3 from "./components/screens/Step3"
import Pricing from "./components/screens/Pricing"
import Profiles from "./components/screens/Profiles"

export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {dispatch}=useContext(UserContext)

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    // else{
    //   if(!history.location.pathname.startsWith('/reset'))
    //   history.push("/step1")
      
    // }
  },[])

  return (
    
      <Switch>
        
      <Route exact path="/signin">
      <Signin />
      </Route>
      <Route exact path="/signup">
      <Signup />
      </Route>
      <Route exact path="/">
        <Step1 />
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
        <Route exact path="/profiles">
        <Profiles />
        </Route>
        <Route exact path="/payments">
        <Payments />
        </Route>
        <Route exact path="/payments/status">
        <PaymentStatus />
        </Route>
      
      
      </Switch>

  )
}



function App() {
  const [state,dispatch]= useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
 
  );
}



export default App;
