import React,{useEffect,useState,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from "./components/screens/Home"
import Payments from "./components/screens/payments"
import {reducer,initialState } from './reducers/userReducer'
import Signin from "./components/screens/Signin"
import Signup from "./components/screens/Signup"
import PaymentStatus from "./components/PaymentStatus"

export const UserContext=createContext()

const Routing=()=>{

  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push("/signin")
      
    }
    

  },[])

  return (
      <Switch>
      <Route exact path="/signin">
      <Signin />
      </Route>
      <Route exact path="/signup">
      <Signup />
      </Route>
      <div>
        <NavBar/>
        <Route exact path="/">
        <Home />
        </Route>
        <Route exact path="/Home">
        <Home />
        </Route>
      </div>
     
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
