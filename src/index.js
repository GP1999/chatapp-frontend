import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from './components/Authentication/Login.js'
import isUserLogedIn from './services/authenticate.js';
// ES6 import or TypeScript


function App() {
    const [isLoggedIn, setIsLogin] = useState(false);

    useEffect(() => {
        isUserLogedIn().then((result)=>{
          setIsLogin(result);
        })
        console.log(isLoggedIn);
    }, []);
    return (<Router>
        <Switch>
            <Route exact path='/'>
                <div>Inside Home</div>
            </Route>

            <Route path="/login"> {
                isLoggedIn?  <Redirect to="/userlist"/>:<Login/>}
             </Route>
            <Route path="/userlist">
               {isLoggedIn?<div>Inside User List</div>:<Redirect to='/login'/>}
            </Route>

        </Switch>
    </Router>)

}

ReactDOM.render (<React.StrictMode>
  <App/>
</React.StrictMode>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
